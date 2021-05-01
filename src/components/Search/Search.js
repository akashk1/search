import React from "react";
import classes from "./Search.module.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Result from "../Results/Result";
const Search = () => {
  const [searchText, setSearchText] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [totalResults, setTotalResults] = React.useState(0);
  React.useEffect(() => {}, [suggestions, searchText]);
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      console.log(context, args);
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  let details = null;
  let suggestionOptions;
  const inputHandler = debounce((value) => {
    if (value === "") {
      setSuggestions([]);
      setTotalResults(0);
      return;
    }
    console.log(value);

    const url = `https://swapi.dev/api/people/?search=${value}`;
    axios.get(url).then((res) => {
      setSuggestions(res.data.results);
      setTotalResults(res.data.results.length);
    });
  }, 1000);
  const showDetails = (data) => {
    var val = document.getElementById("input").value;
    var opts = document.getElementById("suggestions").childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        details = <Result data={val} />;
        break;
      }
    }
  };

  suggestionOptions = suggestions.map((data, id) => {
    return (
      <option
        key={id}
        value={data.name}
        onClick={() => showDetails(data)}
      ></option>
    );
  });

  return (
    <div className={classes.container}>
      <input
        id="input"
        className={classes.search}
        type="text"
        list="suggestions"
        className={classes.search}
        value={searchText}
        onChange={(e) => {
          e.persist();
          setSearchText(e.target.value);
          inputHandler(e.target.value);
        }}
      />
      <datalist className={classes.datalist} id="suggestions">
        {suggestionOptions}
      </datalist>
      <button className={classes.btn}>Search</button>
      <div className={classes.total}>Total Results :{totalResults} </div>
      {details}
    </div>
  );
};

export default Search;
