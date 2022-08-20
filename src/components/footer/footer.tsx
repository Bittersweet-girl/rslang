import React from 'react';
import './footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-git">
          <img src="../../../public/assets/git.svg" alt="git" className="footer-git__link" />
          <div className="footer-links">
            <a href="https://github.com/Bittersweet-girl" className="footer-links__link">Bittersweet-girl</a>
            <br />
            <a href="https://github.com/irUdalova" className="footer-links__link">irUdalova</a>
            <br />
            <a href="https://github.com/gettosun" className="footer-links__link">gettosun</a>
          </div>
        </div>
        <div className="footer-logo">
          <div className="footer-logo__logo" />
          <div className="footer-logo__copyright">C 2022</div>
        </div>
        <div className="footer-rs">
          <a href="https://rs.school/js/" className="footer-rs__link">
            <div className="footer-rs__link_logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
