import { Container } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

function Layout({ children }) {
  return <Container className="m-3">{children}</Container>;
}

export default Layout;
