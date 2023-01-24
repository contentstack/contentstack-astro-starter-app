import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';
// import { onEntryChange } from '../contentstack-sdk';
// import { getFooterRes } from '../helper';
import type { FooterProps, Entry, Links } from "../type/layout";

type Props={
  footer: FooterProps
}
export default function Footer({footer}:Props) {
  const [getFooter, setFooter] = useState(footer);

  // function buildNavigation(ent: Entry, ft: FooterProps) {
  //   let newFooter = { ...ft };
  //   if (ent.length !== newFooter.navigation.link.length) {
  //     ent.forEach((entry) => {
  //       const fFound = newFooter?.navigation.link.find(
  //         (nlink: Links) => nlink.title === entry.title
  //       );
  //       if (!fFound) {
  //         newFooter.navigation.link?.push({
  //           title: entry.title,
  //           href: entry.url,
  //           $: entry.$,
  //         });
  //       }
  //     });
  //   }
  //   return newFooter;
  // }

  // async function fetchData() {
  //   try {
  //     if (footer && entries) {
  //       const footerRes = await getFooterRes();
  //       const newfooter = buildNavigation(entries, footerRes);
  //       setFooter(newfooter);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   onEntryChange(() => fetchData());
  // }, [footer]);

  // const footerData = getFooter ? getFooter : undefined;

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
                    // {...menu.$?.title}
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
