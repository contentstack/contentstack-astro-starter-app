import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Tooltip from "./tool-tip";
import type { HeaderProps, NavLinks } from "../type/layout";
import type { Page } from "../type/page";
type Props = {
  header: HeaderProps;
  allEntries: Page[];
  currentPath: string;
};
export default function Header({ header, allEntries, currentPath }: Props) {
  const [getHeader, setHeader] = useState<HeaderProps>(header);
  useEffect(() => {
    let newHeader = { ...header };
    if (allEntries.length !== newHeader.navigation_menu.length) {
      allEntries.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink: NavLinks) => navLink.label === entry.title
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [{ title: entry.title, url: entry.url }],
            $: {},
          });
        }
      });
    }
    setHeader(newHeader);
  }, []);

  return (
    <header className="header">
      <div className="note-div">
        {getHeader?.notification_bar.show_announcement &&
          typeof getHeader.notification_bar.announcement_text === "string" && (
            <div {...(getHeader.notification_bar.$?.announcement_text as {})}>
              {parse(getHeader.notification_bar.announcement_text)}
            </div>
          )}
      </div>
      <div className="max-width header-div">
        <div className="wrapper-logo">
          {getHeader && (
            <a href="/" className="logo-tag" title="Contentstack">
              <img
                className="logo"
                src={getHeader.logo.url}
                alt={getHeader.title}
                title={getHeader.title}
                {...(getHeader.logo.$?.url as {})}
              />
            </a>
          )}
        </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <nav className="menu">
          <ul className="nav-ul header-ul">
            {getHeader &&
              getHeader?.navigation_menu.map((list: any) => {
                const activeClass =
                  currentPath === list.page_reference[0].url ? " active" : "";
                return (
                  <li
                    key={list.label}
                    className={"nav-li" + activeClass}
                    {...(list.page_reference[0].$?.url as {})}
                  >
                    <a href={list.page_reference[0].url} className={""}>
                      {list.label}
                    </a>
                  </li>
                );
              })}
          </ul>
        </nav>

        <div className="json-preview">
          <Tooltip
            content="JSON Preview"
            direction="top"
            dynamic={false}
            delay={200}
            status={0}
          >
            <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <img src="/images/json.svg" alt="JSON Preview icon" />
            </span>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
