import { ChangeEvent, FormEvent, useState } from 'react';
import './app.css';
import { CellNumber, PasswordStrengthStatus } from './types/types';

function App() {
  const [password, setPassword] = useState<string>('');

  const [strength, setStrength] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value.trim();

    setPassword(newPassword);

    handleCheckStrength(newPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(password);

    setPassword('');

    setStrength(0);
  };

  const handleCheckStrength = (password: string) => {
    const hasLetters = /\p{L}/u.test(password);

    const hasNumbers = /\d/.test(password);

    const hasSymbols = /[^\p{L}\p{N}]/gu.test(password);

    const componentsCount = [hasLetters, hasNumbers, hasSymbols].filter(
      (symbol) => symbol
    ).length;

    if (!password || password.length < 8) {
      setStrength(0);
    } else {
      setStrength(componentsCount);
    }
  };

  const getStatus = (): PasswordStrengthStatus => {
    if (!password.length && !strength) {
      return PasswordStrengthStatus.EMPTY;
    }
    if (strength === 0 && password.length > 0) {
      return PasswordStrengthStatus.UNSAFELY;
    }
    if (strength === 1) {
      return PasswordStrengthStatus.EASY;
    }
    if (strength === 2) {
      return PasswordStrengthStatus.MEDIUM;
    }
    if (strength === 3) {
      return PasswordStrengthStatus.STRONG;
    }
    return PasswordStrengthStatus.EMPTY;
  };

  const prepareClassByStatus = (numberOfCell: number): string => {
    const status = getStatus();

    if (status === PasswordStrengthStatus.EMPTY) return `strength-bar`;

    if (
      status === PasswordStrengthStatus.EASY &&
      numberOfCell === CellNumber.SECOND
    )
      return `strength-bar`;

    if (
      status === PasswordStrengthStatus.UNSAFELY &&
      numberOfCell === CellNumber.THIRD
    )
      return `strength-bar red`;

    if (
      status !== PasswordStrengthStatus.STRONG &&
      numberOfCell === CellNumber.THIRD
    )
      return 'strength-bar';

    if (
      status === PasswordStrengthStatus.STRONG &&
      numberOfCell === CellNumber.THIRD
    )
      return 'strength-bar green';

    if (
      status === PasswordStrengthStatus.UNSAFELY ||
      status === PasswordStrengthStatus.EASY
    )
      return `strength-bar red`;

    if (status === PasswordStrengthStatus.MEDIUM) return `strength-bar yellow`;

    if (status === PasswordStrengthStatus.STRONG) return `strength-bar green`;

    return '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="password"
        placeholder="Enter your strongest password"
        onChange={handleChange}
        value={password}></input>

      <button type="submit">Reset</button>

      <div className="strength-indicator">
        <div className={prepareClassByStatus(0)}></div>

        <div className={prepareClassByStatus(1)}></div>

        <div className={prepareClassByStatus(2)}></div>
      </div>
    </form>
  );
}

export default App;
