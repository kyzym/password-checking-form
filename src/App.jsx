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
    let hasLetters = /\p{Letter}/u.test(password);
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="password"
        placeholder="enter your password"
        onChange={handleChange}
        value={password}></input>
      <div className="strength-indicator">
        <div
          className={
            !password.length && !strength
              ? 'strength-bar'
              : password.length > 0 && !strength
              ? 'strength-bar red'
              : strength === 1 && password.length > 0
              ? 'strength-bar red'
              : strength === 2
              ? 'strength-bar yellow'
              : 'strength-bar green'
          }></div>

        <div
          className={
            !password.length && !strength
              ? 'strength-bar'
              : strength === 0 && password.length > 0
              ? 'strength-bar red'
              : strength === 1
              ? 'strength-bar '
              : strength === 2
              ? 'strength-bar yellow'
              : 'strength-bar green'
          }></div>
        <div
          className={
            !password.length && !strength
              ? 'strength-bar'
              : strength === 0 && password.length > 0
              ? 'strength-bar red'
              : strength === 2
              ? 'strength-bar '
              : strength === 3
              ? 'strength-bar green'
              : 'strength-bar'
          }></div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
