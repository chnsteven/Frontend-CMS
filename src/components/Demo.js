import React, { useState, useRef } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { insightUBCDemoData } from "../utils/constants";

const validateSubquery = (subquery) => {
  try {
    const parts = subquery.split(" ");

    // Check if there are exactly 3 parts (field, operator, value)
    if (parts.length !== 3 && parts.length !== 2) {
      throw new Error("Invalid query format");
    }

    // You can add additional validation for the parts if needed
    return true;
  } catch (e) {
    alert(e.message);
    return false;
  }
};

const categorizeSubquery = (subquery) => {
  if (typeof subquery !== "string") return false;

  const signs = [">", "<", ">=", "<=", "=", "!="];
  const orders = ["ascending", "descending"];
  const containsAnySign = () => {
    return (
      signs.some((sign) => subquery.includes(sign)) &&
      !orders.some((order) => subquery.includes(order))
    );
  };
  const containsAnyOrder = () => {
    return (
      !signs.some((sign) => subquery.includes(sign)) &&
      orders.some((order) => subquery.includes(order))
    );
  };
  if (containsAnySign()) {
    return "comparison query";
  } else if (containsAnyOrder()) {
    return "sorting query";
  } else {
    return false;
  }
};

const compareQuery = (subquery, data) => {
  const [field, operator, value] = subquery.split(" ");
  const numericValue = parseFloat(value);
  const filteredData = data.filter((item) => {
    const fieldValue = item[`course_${field}`];
    switch (operator) {
      case "=":
        return fieldValue === numericValue;
      case "!=":
        return fieldValue !== numericValue;
      case ">":
        return fieldValue > numericValue;
      case "<":
        return fieldValue < numericValue;
      case ">=":
        return fieldValue >= numericValue;
      case "<=":
        return fieldValue <= numericValue;
      default:
        return false;
    }
  });
  return filteredData;
};

const sortQuery = (subquery, data) => {
  const [field, order] = subquery.split(" ");
  const sortedData = data.sort((a, b) => {
    const aValue = a[`course_${field}`];
    const bValue = b[`course_${field}`];
    if (order === "ascending") {
      return aValue - bValue;
    } else if (order === "descending") {
      return bValue - aValue;
    } else {
      console.error("Invalid order");
      return 0;
    }
  });
  return sortedData;
};
function Demo() {
  const queryRef = useRef("");
  const [data, setData] = useState(insightUBCDemoData);
  const [searchFilterValues, setSearchFilterValues] = useState({});
  const fields = Object.keys(data[0]).map((key) => key.split("_")[1]); // Get all the field names from the first item
  const [visibleFields, setVisibleFields] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  ); // State to keep track of visible columns

  const handleInputChange = (e, field) => {
    setSearchFilterValues({
      ...searchFilterValues,
      [field]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchFilterValues);
    const filteredData = data.filter((course) => {});

    // const subqueries = query.split(",").map((item) => item.trim());
    // subqueries.forEach((subquery) => {
    //   if (validateSubquery(subquery)) {
    //     const queryType = categorizeSubquery(subquery);
    //     if (typeof queryType === "string") {
    //       switch (queryType) {
    //         case "comparison query":
    //           setData(compareQuery(subquery, insightUBCDemoData));
    //           break;
    //         case "sorting query":
    //           setData(sortQuery(subquery, insightUBCDemoData));
    //           break;
    //         default:
    //           console.error("Invalid query type");
    //           break;
    //       }
    //     }
    //   }
    // });
  };

  return (
    <div className="demo-container">
      <h2>Demo</h2>
      <div>
        <h3>Sample Data (AI generated)</h3>
        <div className="code-block">
          <CodeBlock
            text={JSON.stringify(insightUBCDemoData, null, 4)}
            language="json"
            showLineNumbers={false}
            theme={dracula}
          />
        </div>
      </div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <legend>Search Filters (optional)</legend>
            <div className="search-filter">
              {Object.keys(data[0]).map((key, index) => {
                const field = key.split("_")[1];
                return (
                  <div key={`search-filter-container-${index}`}>
                    <label htmlFor={`search-filter-${index}`}>
                      {field.toUpperCase()}
                    </label>
                    <input
                      id={`search-filter-${index}`}
                      key={`search-filter-${index}`}
                      type="text"
                      placeholder="Enter a value or leave blank"
                      onChange={(e) => handleInputChange(e, field)}
                    />
                    <span className="validity"></span>
                  </div>
                );
              })}
            </div>
            <div className="search-filter-submit">
              <button type="submit">Apply Filters</button>
            </div>
          </fieldset>
        </form>
      </div>

      <div className="result-container">
        <h3>Search results</h3>
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => {
                const field = key.split("_")[1];
                return visibleFields[field] ? (
                  <th key={`th-${field}-${index}`}>{field.toUpperCase()}</th>
                ) : null; // Hide the column if it's not checked
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((course, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {Object.entries(course).map(([key, value], colIndex) => {
                  const field = key.split("_")[1];
                  return visibleFields[field] ? (
                    <td key={`${key}-${rowIndex}`}>{value}</td>
                  ) : null; // Hide the data cell if the column is not visible
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Demo;
