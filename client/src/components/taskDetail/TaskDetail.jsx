import React, { useState } from "react";

const TaskDetail = ({ task }) => {
    const renderFilePreview = (fileUrl) => {
        const extension = fileUrl.split(".").pop();
    
        if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
          return (
            <img
              src={fileUrl}
              alt="File Preview"
              className="h-52 w-full object-cover rounded-md"
            />
          );
        }
    
        const fileIcons = {
          pdf: "📄", // You can replace this with an actual icon.
          doc: "📄",
          docx: "📄",
          default: "📎",
        };
    
        return (
          <div className="flex items-center justify-center h-20 bg-white rounded-md text-2xl">
            {fileIcons[extension] || fileIcons.default}
          </div>
        );
      };
    
      return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-2">{task.title}</h3>
          <p className="text-gray-700 mb-4">{task.desc}</p>
          <p className="text-sm text-gray-500">
            <strong>Assignee:</strong> {task.assignee}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Status:</strong> {task.status}
          </p>
          <div className="mt-4">
            <h4 className="font-semibold">Files:</h4>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {task.files.map((file, index) => (
                <a
                  key={index}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border rounded-md overflow-hidden hover:shadow-lg"
                >
                  {renderFilePreview(file)}
                  <div className="text-center mt-1 text-sm text-gray-600 truncate">
                    {file.split("/").pop()}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      );
};

export default TaskDetail;