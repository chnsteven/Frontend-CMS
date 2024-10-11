import React, { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import {
  insightUBCDemoData as initialData,
  operatorMap,
  stringMatchingFields,
} from "../utils/constants";
import {
  faFilter,
  faSort,
  faSortUp,
  faSortDown,
  faToggleOn,
  faToggleOff,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function QueryEngine() {
  const [data, setData] = useState(initialData);
  const fields =
    data.length > 0 ? Object.keys(data[0]).map((key) => key.split("_")[1]) : []; // Get all the field names only if data exists

  const [unsortedData, setUnsortedData] = useState(data);
  const [searchFilters, setSearchFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [visibilityConfig, setVisibilityConfig] = useState(
    fields.map((field) => ({
      field: field,
      visible: true,
    }))
  );

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
    setUnsortedData(filteredData);
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setSearchFilters({});
    setData(initialData);
    setUnsortedData(initialData);
  };

  const handleVisibility = (field) => {
    setVisibilityConfig((prevConfig) =>
      prevConfig.map((item) =>
        item.field === field ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleShowAllColumns = () => {
    setVisibilityConfig(
      fields.map((field) => ({
        field: field,
        visible: true,
      }))
    );
  };

  const handleShowNoColumns = () => {
    setVisibilityConfig(
      fields.map((field) => ({
        field: field,
        visible: false,
      }))
    );
  };
  const handleResetOrder = () => {
    setSortConfig({ key: null, direction: null });
    setData(unsortedData);
  };

  const handleSort = (field) => {
    let direction;

    if (sortConfig.key === field && sortConfig.direction === "desc") {
      direction = "asc";
    } else if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    } else {
      direction = "asc";
    }

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[`course_${field}`];
      const bValue = b[`course_${field}`];

      if (direction === "asc") return aValue < bValue ? -1 : 1;
      if (direction === "desc") return aValue > bValue ? -1 : 1;
      return 0; // No sorting if direction is null
    });

    setData(sortedData);
    setSortConfig({ key: field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig.key === field) {
      if (sortConfig.direction === "asc") return faSortUp;
      if (sortConfig.direction === "desc") return faSortDown;
    }
    return faSort;
  };

  const getVisibilityIcon = (field) => {
    const fieldVisibility = visibilityConfig.find(
      (item) => item.field === field
    );
    return fieldVisibility && fieldVisibility.visible
      ? faToggleOn
      : faToggleOff;
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
            <legend>
              Search Filters <FontAwesomeIcon icon={faFilter} />
            </legend>
            <div id="search-filter">
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
            <div>
              <button className="round-button" onClick={handleApplyFilters}>
                Apply Filters
              </button>
              <button className="round-button" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div id="result-container">
        <div id="result-container-title">
          <h3>Search results</h3>
          <fieldset>
            <legend>
              Options <FontAwesomeIcon icon={faGears} />
            </legend>
            <label htmlFor="show-all-columns" className="hidden">
              Show All Columns
            </label>
            <input
              id="show-all-columns"
              className="round-button"
              type="button"
              onClick={handleShowAllColumns}
              value="Show All Columns"
            />
            <label htmlFor="show-no-columns" className="hidden">
              Show No Columns
            </label>
            <input
              id="show-no-columns"
              className="round-button"
              type="button"
              onClick={handleShowNoColumns}
              value="Show No Columns"
            />
            <label htmlFor="reset-order" className="hidden">
              Reset Order
            </label>
            <input
              id="reset-order"
              className="round-button"
              type="button"
              onClick={handleResetOrder}
              value="Reset Order"
            />
          </fieldset>
        </div>

        {data.length === 0 ? (
          <p>No results found. Please adjust your filters.</p>
        ) : (
          <table id="result-container-table">
            <thead>
              <tr>
                {fields.map((field, index) => (
                  <th
                    key={`th-icon-${field}-${index}`}
                    onClick={() => handleVisibility(field)}
                  >
                    <FontAwesomeIcon
                      className="toggle-button"
                      icon={getVisibilityIcon(field)}
                    />
                  </th>
                ))}
              </tr>
              <tr>
                {fields.map((field, index) => (
                  <th
                    key={`th-${field}-${index}`}
                    onClick={() => handleSort(field)}
                  >
                    <p className="field-name">{field.toUpperCase()}</p>
                    <FontAwesomeIcon icon={getSortIcon(field)} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((course, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {Object.entries(course).map(([key, value], colIndex) => {
                    return visibilityConfig[colIndex].visible ? (
                      <td
                        key={`${key}-${rowIndex}`}
                        className="result-container-table"
                      >
                        {value}
                      </td>
                    ) : (
                      <td
                        key={`${key}-${rowIndex}`}
                        className="result-container-table"
                      >
                        &nbsp;
                      </td>
                    );
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

export default QueryEngine;
