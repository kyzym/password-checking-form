import { useState } from 'react';
import './app.css';

function App() {
  const [password, setPassword] = useState('');

  const [strength, setStrength] = useState(0);

  const handleChange = (e) => {
    const newPassword = e.target.value.trim();

    setPassword(newPassword);

    handleCheckStrength(newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password);

    setPassword('');

    setStrength(0);
  };

  const handleCheckStrength = (password) => {
    let hasLetters = /\p{L}/u.test(password);

    let hasNumbers = /\d/.test(password);

    let hasSymbols = /[^\p{L}\p{N}]/gu.test(password);

    let componentsCount = [hasLetters, hasNumbers, hasSymbols].filter(
      (symbol) => symbol
    ).length;

    if (!password || password.length < 8) {
      setStrength(0);
    } else {
      setStrength(componentsCount);
    }
  };

  const getStatus = () => {
    if (!password.length && !strength) {
      return 'empty';
    }
    if (strength === 0 && password.length > 0) {
      return 'unsafely';
    }
    if (strength === 1) {
      return 'easy';
    }
    if (strength === 2) {
      return 'medium';
    }
    if (strength === 3) {
      return 'strong';
    }
  };

  const prepareClassByStatus = (numberOfCell) => {
    const status = getStatus();

    if (status === 'empty') return `strength-bar`;

    if (status === 'easy' && numberOfCell === 1) return `strength-bar`;

    if (status === 'unsafely' && numberOfCell === 2) return `strength-bar red`;

    if (status !== 'strong' && numberOfCell === 2) return 'strength-bar';

    if (status === 'strong' && numberOfCell === 2) return 'strength-bar green';

    if (status === 'unsafely' || status === 'easy') return `strength-bar red`;

    if (status === 'medium') return `strength-bar yellow`;

    if (status === 'strong') return `strength-bar green`;
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
