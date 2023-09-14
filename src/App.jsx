import React, { useState } from "react";

import "./App.css";
import Comment from "./components/Comment";

const comments = {
  id: 1,
  replyes: [
    // {
    //   id: 2,
    //   name: "Some text and some more",
    //   replyes: [
    //     {
    //       id: 5,
    //       name: "Some text and some more",
    //       replyes: [
    //         {
    //           id: 6,
    //           name: "Some text and some more",
    //           replyes: [],
    //         },
    //         {
    //           id: 7,
    //           name: "Some text and some more",
    //           replyes: [],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   name: "Some text and some more",
    //   replyes: [
    //     {
    //       id: 8,
    //       name: "Some text and some more",
    //       replyes: [],
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   name: "Some text and some more",
    //   replyes: [],
    // },
  ],
};
const insertNode = (tree, commentId, item) => {
  if (tree.id === commentId) {
    tree.replyes.unshift({
      id: new Date().getTime(),
      name: item,
      replyes: [],
    });

    return tree;
  }

  let latestNode = [];
  latestNode = tree.replyes.map((ob) => {
    return insertNode(ob, commentId, item);
  });

  return { ...tree, replyes: latestNode };
};

const deleteNode = (tree, id) => {
  for (let i = 0; i < tree.replyes.length; i++) {
    let node = tree.replyes[i];
    if (node.id === id) {
      tree.replyes.splice(i, 1);
      return tree;
    } else {
      deleteNode(node, id);
    }
  }
  return tree;
};

const App = () => {
  const [commentData, setCommentData] = useState(comments);
  const [render, setRender] = useState(2);

  const handleInsertNode = (nodeId, node) => {
    if (node.length === 0) return;
    const finalStructure = insertNode(commentData, nodeId, node);
    setCommentData(finalStructure);
  };

  const handleOndelete = (id) => {
    const finalStructure = deleteNode(commentData, id);

    setCommentData(finalStructure);
    setRender(render + 1);
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Nested Comment</h1>
      <div className="p-3 rounded-md bg-slate-500 text-white mx-5 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, dolores
        deserunt. Nam, autem quasi similique asperiores amet quis aliquam sed
        est recusandae tempora aliquid sint, rerum provident laudantium.
        Similique, repellendus! Doloribus autem soluta nobis numquam id ipsa
        error nihil rem possimus hic ab, optio magni quisquam iste est,
        blanditiis ipsum! Perferendis corrupti earum aut ab cupiditate officia
        eveniet dolore in? Hic magni dolore maiores quibusdam tempore culpa
        repudiandae commodi alias, nemo libero, laborum cupiditate corporis
        aliquid! Pariatur, ex officia eaque tenetur quaerat at quis natus,
        quidem nesciunt asperiores explicabo eius. Nulla, iste voluptatum
        laudantium deserunt tempora ut dicta, sint possimus earum in est itaque,
        quaerat a culpa facilis autem atque. Excepturi ut aperiam dignissimos
        aliquid, nesciunt consectetur expedita numquam laboriosam? Ea, tempora
        nihil. Doloribus amet, sapiente, eveniet adipisci unde corporis eius
        ipsam ullam facere, omnis quidem commodi corrupti suscipit? Tempora,
      </div>
      <Comment
        key={render}
        commentData={commentData}
        handleInsertNode={handleInsertNode}
        handleOndelete={handleOndelete}
      />
    </div>
  );
};

export default App;
