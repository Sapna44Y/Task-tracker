import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.5;
    background: ${({ theme }) => theme.bodyBg};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s, color 0.2s;
  }

  body.light-mode {
    background: ${({ theme }) => theme.bodyBg};
    color: ${({ theme }) => theme.text};
  }

  body.dark-mode {
    background: #1a1a1a;
    color: #f5f5f5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  h1, h2, h3, h4 {
    line-height: 1.2;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 0.5rem;
    }
  }
`;
