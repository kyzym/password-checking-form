import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import {
  CellNumber,
  PasswordStrengthStatus,
  StrengthStatus,
} from './types/types';
import {
  LETTERS_REGEXP,
  NUMBERS_REGEXP,
  STRENGTH_BAR,
  STRENGTH_BAR_GREEN,
  STRENGTH_BAR_RED,
  STRENGTH_BAR_YELLOW,
  SYMBOLS_REGEXP,
  minSecureNumber,
} from './utils/constants';

function App() {
  const [password, setPassword] = useState<string>('');

  const [strength, setStrength] = useState<StrengthStatus>(
    StrengthStatus.UNSAFELY
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value.trim();

    setPassword(newPassword);

    handleCheckStrength(newPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(`${password}\nThanks 😎`);

    setPassword('');

    setStrength(StrengthStatus.UNSAFELY);
  };

  const handleCheckStrength = (password: string) => {
    const hasLetters = LETTERS_REGEXP.test(password);

    const hasNumbers = NUMBERS_REGEXP.test(password);

    const hasSymbols = SYMBOLS_REGEXP.test(password);

    const componentsCount = [hasLetters, hasNumbers, hasSymbols].filter(
      (symbol) => symbol
    ).length;

    if (!password || password.length < minSecureNumber) {
      setStrength(StrengthStatus.UNSAFELY);
    } else {
      setStrength(componentsCount);
    }
  };

  const getStatus = (): PasswordStrengthStatus => {
    switch (strength) {
      case StrengthStatus.UNSAFELY:
        return password.length > 0
          ? PasswordStrengthStatus.UNSAFELY
          : PasswordStrengthStatus.EMPTY;

      case StrengthStatus.EASY:
        return PasswordStrengthStatus.EASY;

      case StrengthStatus.MEDIUM:
        return PasswordStrengthStatus.MEDIUM;

      case StrengthStatus.STRONG:
        return PasswordStrengthStatus.STRONG;

      default:
        return PasswordStrengthStatus.EMPTY;
    }
  };

  const prepareClassByStatus = (numberOfCell: number): string => {
    const status = getStatus();

    if (status === PasswordStrengthStatus.EMPTY) return STRENGTH_BAR;

    if (
      status === PasswordStrengthStatus.EASY &&
      numberOfCell === CellNumber.SECOND
    )
      return STRENGTH_BAR;

    if (
      status === PasswordStrengthStatus.UNSAFELY &&
      numberOfCell === CellNumber.THIRD
    )
      return STRENGTH_BAR_RED;

    if (
      status !== PasswordStrengthStatus.STRONG &&
      numberOfCell === CellNumber.THIRD
    )
      return STRENGTH_BAR;

    if (
      status === PasswordStrengthStatus.STRONG &&
      numberOfCell === CellNumber.THIRD
    )
      return STRENGTH_BAR_GREEN;

    if (
      status === PasswordStrengthStatus.UNSAFELY ||
      status === PasswordStrengthStatus.EASY
    )
      return STRENGTH_BAR_RED;

    if (status === PasswordStrengthStatus.MEDIUM) return STRENGTH_BAR_YELLOW;

    if (status === PasswordStrengthStatus.STRONG) return STRENGTH_BAR_GREEN;

    return STRENGTH_BAR;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="password"
        placeholder="Enter your strongest password"
        onChange={handleChange}
        value={password}
      />

      <button type="submit">Reset</button>

      <div className="strength-indicator">
        <div className={prepareClassByStatus(CellNumber.FIRST)}></div>

        <div className={prepareClassByStatus(CellNumber.SECOND)}></div>

        <div className={prepareClassByStatus(CellNumber.THIRD)}></div>
      </div>
    </form>
  );
}

export default App;
