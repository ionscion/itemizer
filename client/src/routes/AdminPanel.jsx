import React from "react";
import { useState, useEffect } from "react";
import useCustomContext from "../hooks/useCustomContext";

function AdminPanel() {
  const [moreKeywords, setMoreKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newDamageValue, setNewDamageValue] = useState("");
  const [showCancel, setShowCancel] = useState(false);
  const { keywordApiInfo } = useCustomContext();
 

  useEffect(() => {
    if (keywordApiInfo) {
      console.log(keywordApiInfo);
    }
  }, [keywordApiInfo]);

  const handleAddItem = (e) => {
    e.preventDefault();
    console.log(e.target["ring-name"].value);
    console.log(e.target["ring-description"].value);
    console.log(e.target["keywords"].value);
    console.log(e.target["damage-value"].value);
    console.log(e.target["keywords-2"]?.value);
    console.log(e.target["damage-value-2"]?.value);
    console.log(e.target["keywords-3"]?.value);
    console.log(e.target["damage-value-3"]?.value);
  };

  const handleAddMoreKeys = (e) => {
    e.preventDefault();
    setMoreKeywords([
      ...moreKeywords,
      { keyword: newKeyword, damageValue: newDamageValue },
    ]);
    setNewKeyword("");
    setNewDamageValue("");
    setShowCancel(true);
  };

  const handleRemoveKeys = (e) => {
    e.preventDefault();
    setMoreKeywords([]);
    setShowCancel(false);
  };

  return (
    <div className="m-5">
      <h3 className="text-2xl font-bold mb-4">Admin Panel</h3>
      <form
        className="flex flex-col space-y-4 p-4 border border-gray-300 rounded-lg shadow-md"
        onSubmit={handleAddItem}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ring Name
          </label>
          <input
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            name="ring-name"
            type="text"
            placeholder="Ring name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ring Description
          </label>
          <input
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            name="ring-description"
            type="text"
            placeholder="Ring description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <select
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            name="keywords"
            id="keywords"
          >
            <option value="">Select a keyword</option>
            <option value="">Null</option>
            {keywordApiInfo?.map((keyword) => (
              <option key={keyword.id} value={keyword.keyword}>
                {keyword.keyword}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Damage Value
          </label>
          <input
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            name="damage-value"
            type="text"
            id="damage-value"
            placeholder="Damage value"
          />
        </div>
        <div>
          <button
            onClick={handleAddMoreKeys}
            className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mr-5"
          >
            Add More Keywords
          </button>
          {showCancel && (
            <button
              onClick={handleRemoveKeys}
              className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              Cancel
            </button>
          )}
        </div>
        {moreKeywords.map((keyword, index) => (
          <div key={index}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Keywords
              </label>
              <select
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                name={`keywords-${index + 2}`} // Use a unique name for each additional keyword
                value={keyword.keyword}
                onChange={(e) => {
                  const updatedKeywords = [...moreKeywords];
                  updatedKeywords[index].keyword = e.target.value;
                  setMoreKeywords(updatedKeywords);
                }}
              >
                <option value="">Select a keyword</option>
                <option value="">Null</option>
                {keywordApiInfo?.map((keyword) => (
                  <option key={keyword.id} value={keyword.keyword}>
                    {keyword.keyword}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Damage Value
              </label>
              <input
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                name={`damage-value-${index + 2}`} // Use a unique name for each additional damage value
                type="text"
                value={keyword.damageValue}
                onChange={(e) => {
                  const updatedKeywords = [...moreKeywords];
                  updatedKeywords[index].damageValue = e.target.value;
                  setMoreKeywords(updatedKeywords);
                }}
                placeholder="Damage value"
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;
