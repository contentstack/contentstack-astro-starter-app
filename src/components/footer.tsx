import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
// import { onEntryChange } from '../contentstack-sdk';
// import { getFooterRes } from '../helper';
import type { FooterProps, Entry, Links } from "../type/layout";
import type { Page } from "../type/page";

type Props = {
  footer: FooterProps;
  allEntries: Page[];
};
export default function Footer({ footer, allEntries }: Props) {
  const [getFooter, setFooter] = useState(footer);
  useEffect(() => {
    let newFooter = { ...footer };
    if (allEntries.length !== newFooter.navigation.link.length) {
      allEntries.forEach((entry) => {
        const fFound = newFooter?.navigation.link.find(
          (nlink: Links) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: {
              title: entry.$.title,
              href: entry.$.url,
            },
          });
        }
      });
    }
    setFooter(newFooter);
  }, []);

  return (
    <footer>
      <div className="max-width footer-div">
        <div className="col-quarter">
          {getFooter && getFooter.logo && (
            <a href="/" className="logo-tag">
              <img
                src={getFooter.logo.url}
                alt={getFooter.title}
                title={getFooter.title}
                {...(getFooter.logo.$?.url as {})}
                className="logo footer-logo"
              />
            </a>
          )}
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {getFooter &&
                getFooter.navigation.link.map((menu) => (
                  <li
                    className="footer-nav-li"
                    key={menu.title}
                    {...(menu.$?.title as {})}
                  >
                    <a href={menu.href}>{menu.title}</a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {getFooter &&
              getFooter.social?.social_share.map((social) => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title}
                >
                  {social.icon && (
                    <img
                      src={social.icon.url}
                      alt={social.link.title}
                      {...(social.icon.$?.url as {})}
                    />
                  )}
                </a>
              ))}
          </div>
        </div>
      </div>
      {getFooter && typeof getFooter.copyright === "string" && (
        <div className="copyright" {...(footer.$?.copyright as {})}>
          {parse(getFooter.copyright)}
        </div>
      )}
    </footer>
  );
}
