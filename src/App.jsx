import { useState } from 'react';

function App() {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    handleCheckStrength(newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    setPassword('');
  };

  const handleCheckStrength = (password) => {
    let hasLetters = /\p{Letter}/u.test(password);
    let hasNumbers = /\d/.test(password);
    let hasSymbols = /[^\p{L}\p{N}]/gu.test(password);
    let componentsCount = [hasLetters, hasNumbers, hasSymbols].filter(
      (symbol) => symbol
    ).length;

    if (password.length < 8) {
      console.log('weak');
    } else if (componentsCount === 1) {
      console.log('easy');
    } else if (componentsCount === 2) {
      console.log('medium');
    } else if (componentsCount === 3) {
      console.log('hard');
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
