import React, { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import {
  insightUBCDemoData as initialData,
  operatorMap,
  stringMatchingFields,
} from "../utils/constants";

function Demo() {
  const [data, setData] = useState(initialData);
  const [searchFilters, setSearchFilters] = useState({});
  const fields =
    data.length > 0 ? Object.keys(data[0]).map((key) => key.split("_")[1]) : []; // Get all the field names only if data exists
  const [visibleFields, setVisibleFields] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  ); // State to keep track of visible columns

  const handleInputChange = (e, field) => {
    setSearchFilters({
      ...searchFilters,
      [field]: {
        ...searchFilters[field],
        value: e.target.value,
      },
    });
  };

  const handleOperatorChange = (e, field) => {
    setSearchFilters({
      ...searchFilters,
      [field]: {
        ...searchFilters[field],
        operator: e.target.value,
      },
    });
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();

    const applyFilters = (data, filters) => {
      return data.filter((course) => {
        return Object.keys(filters).every((field) => {
          const { operator, value } = filters[field];
          const fieldValue = course[`course_${field}`];

          if (stringMatchingFields.includes(field.toLowerCase())) {
            return fieldValue.toLowerCase().includes(value.toLowerCase());
          }

          const compareFn = operatorMap[operator];
          if (!compareFn) return true;

          return compareFn(fieldValue, value);
        });
      });
    };

    const filteredData = applyFilters(data, searchFilters);
    setData(filteredData);
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setSearchFilters({});
    setData(initialData);
  };

  return (
    <div className="demo-container">
      <h2>Demo</h2>
      <div>
        <h3>Sample Data (AI generated)</h3>
        <div className="code-block">
          <CodeBlock
            text={JSON.stringify(initialData, null, 4)}
            language="json"
            showLineNumbers={false}
            theme={dracula}
          />
        </div>
      </div>
      <div>
        <form autoComplete="off">
          <fieldset>
            <legend>Search Filters (optional)</legend>
            <div className="search-filter">
              {fields.map((field, index) => {
                const filter = searchFilters[field] || {};

                return (
                  <div key={`search-filter-container-${index}`}>
                    <label htmlFor={`search-filter-${index}`}>
                      {field.toUpperCase()}
                    </label>
                    {!stringMatchingFields.includes(field) ? (
                      <select
                        name={`operator-${index}`}
                        id={`operator-selector-${index}`}
                        value={filter.operator || ""}
                        onChange={(e) => handleOperatorChange(e, field)}
                      >
                        <option value="">--</option>
                        <option value="greater-than">&gt;</option>
                        <option value="greater-than-equal">&ge;</option>
                        <option value="less-than">&lt;</option>
                        <option value="less-than-equal">&le;</option>
                        <option value="equal"> &#61;</option>
                        <option value="not-equal">&ne;</option>
                      </select>
                    ) : null}

                    {!stringMatchingFields.includes(field) ? (
                      <input
                        id={`search-filter-${index}`}
                        key={`search-filter-${index}`}
                        type="text"
                        value={filter.value || ""}
                        placeholder="Enter number"
                        onChange={(e) => handleInputChange(e, field)}
                      />
                    ) : (
                      <input
                        id={`search-filter-${index}`}
                        key={`search-filter-${index}`}
                        type="text"
                        value={filter.value || ""}
                        placeholder="Enter text"
                        onChange={(e) => handleInputChange(e, field)}
                      />
                    )}

                    <span className="validity"></span>
                  </div>
                );
              })}
            </div>
            <div className="search-filter-buttons">
              <button onClick={handleApplyFilters}>Apply Filters</button>
              <button onClick={handleResetFilters}>Reset Filters</button>
            </div>
          </fieldset>
        </form>
      </div>

      <div className="result-container">
        <h3>Search results</h3>
        {data.length === 0 ? (
          <p>No results found. Please adjust your filters.</p>
        ) : (
          <table>
            <thead>
              <tr>
                {fields.map((field, index) =>
                  visibleFields[field] ? (
                    <th key={`th-${field}-${index}`}>{field.toUpperCase()}</th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((course, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {Object.entries(course).map(([key, value], colIndex) => {
                    const field = key.split("_")[1];
                    return visibleFields[field] ? (
                      <td key={`${key}-${rowIndex}`}>{value}</td>
                    ) : null;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Demo;
