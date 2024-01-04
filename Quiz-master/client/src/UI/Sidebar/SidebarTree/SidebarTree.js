//Sidebartree

import React from "react";
import { NavLink } from "react-router-dom";
import Routes from "../../../config/Routes";
import FontAwesome from "../../../config/FontAwesome";
const SidebarTree = props => {
  let { node, children } = props;
  if (!node) return;
  let display;
  if (children.length > 0) {
    display = (
      <li className="nav-item" key={node.label + "0"}>
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target={`#collapsePages${node.id}`}
        >
          <i
            className={
              FontAwesome[
                node.label
                  .toUpperCase()
                  .split(" ")
                  .join("_")
              ]
            }
          />
          <span>{node.label}</span>
        </a>
        <div
          id={`collapsePages${node.id}`}
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          {children.length > 0 ? (
            <div className="bg-white py-2 collapse-inner rounded">
              {children.map(child => {
                return (
                  <NavLink
                    key={"n>" + child.label}
                    className="collapse-item"
                    to={
                      Routes[
                        child.label
                          .toUpperCase()
                          .split(" ")
                          .join("_")
                      ]
                    }
                  >
                    {child.label}
                  </NavLink>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </li>
    );
  } else {
    display = (
      <li className="nav-item" key={node.label}>
        <NavLink
          key={"n<" + node.label}
          className="nav-link"
          to={
            Routes[
              node.label
                .toUpperCase()
                .split(" ")
                .join("_")
            ]
          }
        >
          <i
            className={
              FontAwesome[
                node.label
                  .toUpperCase()
                  .split(" ")
                  .join("_")
              ]
            }
          />
          <span>{node.label}</span>
        </NavLink>
      </li>
    );
  }
  return <>{display}</>;
};

export default SidebarTree;
