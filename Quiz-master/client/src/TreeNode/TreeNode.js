import React from "react";
import { MDBInput } from "mdbreact";
import { ListGroup } from "react-bootstrap";

const TreeNode = props => {
  let { node, children } = props;
  return (
    <>
      <ListGroup as="ul">
        <ListGroup.Item as="li" style={{ border: 0 }}>
          <div class="custom-control custom-checkbox">
            <input
              id={node.id}
              type="checkbox"
              class="custom-control-input"
              onChange={props.permissionHandler}
              data-parent={node.parent}
            />
            <label class="custom-control-label" for={node.id}>
              {node.label}
            </label>{" "}
          </div>
        </ListGroup.Item>

        <ul>
          {children.map(child => {
            return TreeNode({
              node: child,
              children: child.children,
              permissionHandler: props.permissionHandler
            });
          })}
        </ul>
      </ListGroup>
    </>
  );
};
export default TreeNode;
