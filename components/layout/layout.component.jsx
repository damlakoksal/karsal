import "./layout.styles.scss";

import Announcement from "./announcement/announcement.component";
import Footer from "./footer/footer.component";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Announcement />
      {children}
      <Footer />
    </div>
  );
}
