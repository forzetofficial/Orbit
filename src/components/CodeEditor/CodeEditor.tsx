import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from './CodeEditor.module.css';
import { CodeExercise } from '../../types/course';
import { useCourses } from '../../context/CourseContext';

interface CodeEditorProps {
  exercise: CodeExercise;
  onComplete: () => void;
  courseId: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ exercise, onComplete, courseId }) => {
  const [code, setCode] = useState(exercise.initialCode);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { updateTimeSpent } = useCourses();

  useEffect(() => {
    setStartTime(new Date());
    return () => {
      if (startTime) {
        const endTime = new Date();
        const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 60000); // Convert to minutes
        updateTimeSpent(courseId, timeSpent);
      }
    };
  }, []);

  const runTests = () => {
    setError(null);
    setTestResults([]);

    try {
      // Create a function from the code
      const userFunction = new Function(`return ${code}`)();

      // Run all tests
      const results = exercise.tests.map(test => {
        try {
          const result = userFunction(...test.input);
          const passed = result === test.expected;
          return {
            passed,
            message: passed 
              ? 'Тест пройден успешно!' 
              : `Ожидалось: ${test.expected}, Получено: ${result}`
          };
        } catch (e) {
          return {
            passed: false,
            message: `Ошибка выполнения: ${e.message}`
          };
        }
      });

      setTestResults(results);

      // If all tests passed, mark as complete
      if (results.every(r => r.passed)) {
        onComplete();
      }
    } catch (e) {
      setError(`Ошибка синтаксиса: ${e.message}`);
    }
  };

  return (
    <div className={styles.codeEditor}>
      <div className={styles.task}>
        <h3>Задание:</h3>
        <p>{exercise.task}</p>
      </div>

      <Editor
        height="300px"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
        }}
      />

      <div className={styles.controls}>
        <button className="btn btn-primary" onClick={runTests}>
          Проверить решение
        </button>
        <button 
          className="btn btn-outline"
          onClick={() => setCode(exercise.initialCode)}
        >
          Сбросить код
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <FaTimes className={styles.errorIcon} />
          {error}
        </div>
      )}

      {testResults.length > 0 && (
        <div className={styles.testResults}>
          <h4>Результаты тестов:</h4>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`${styles.testResult} ${result.passed ? styles.passed : styles.failed}`}
            >
              {result.passed ? (
                <FaCheck className={styles.resultIcon} />
              ) : (
                <FaTimes className={styles.resultIcon} />
              )}
              <span>Тест {index + 1}: </span>
              <span>{result.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;