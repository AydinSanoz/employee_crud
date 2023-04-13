import { Container } from "react-bootstrap";

function Layout({ children }) {
  return <Container className="m-3">{children}</Container>;
}

export default Layout;
