import styled from "styled-components";
export default function Login() {
  return (
    <form action="">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <input type="submit" value="Submit" />
    </form>
  );
}
