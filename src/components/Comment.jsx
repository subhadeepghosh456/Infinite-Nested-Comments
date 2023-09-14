import React, { useState } from "react";

const Comment = ({ commentData, handleInsertNode, handleOndelete }) => {
  const [text, setText] = useState("");
  const [showReply, setShowReply] = useState(false);
  // console.log(commentData);
  const handleClick = () => {
    // console.log(handleInsertNode);
    if (text.trim().length === 0) return;
    handleInsertNode(commentData.id, text);
    setText("");
    setShowReply(!showReply);
  };

  const handleDelete = () => {
    handleOndelete(commentData.id);
  };

  return (
    <div className="ml-11 mt-5">
      {commentData.id === 1 && (
        <div>
          <input
            type="text"
            className="w-80 border border-gray-400 py-3 rounded-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="button"
            className="bg-gray-400 px-2 text-white py-3 rounded-md"
            onClick={handleClick}
          >
            Comment
          </button>
        </div>
      )}

      <div>
        {commentData.name && (
          <div className="flex flex-col px-3 rounded-md justify-between py-2  bg-slate-400">
            <div className="flex justify-between">
              <span className="font-bold text-white text-xl">
                {commentData.name}
              </span>
              <div className="space-x-2">
                <button
                  className="px-4 py-1 bg-red-800 text-white font-bold rounded-md  cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                {showReply ? (
                  <span
                    className="px-4 py-1 bg-white text-black font-bold rounded-md  cursor-pointer"
                    onClick={() => setShowReply(!showReply)}
                  >
                    Cancel
                  </span>
                ) : (
                  <span
                    className="px-4 py-1 bg-white text-black font-bold rounded-md cursor-pointer"
                    onClick={() => setShowReply(!showReply)}
                  >
                    Reply
                  </span>
                )}
              </div>
            </div>

            {showReply && (
              <div
                key={commentData.id}
                className="w-full flex justify-around pt-5"
              >
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-md"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-gray-800 rounded-md  px-4 text-white"
                  onClick={handleClick}
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        )}
        {commentData.replyes.map((item) => {
          return (
            <Comment
              commentData={item}
              key={item.id}
              handleInsertNode={handleInsertNode}
              handleOndelete={handleOndelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
