import RepoCheck from "./Check";
import "./style.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  arrPages = [];

  nextPage() {
    this.setState((prevState) => {
      if (
        this.state.page < this.state.pages &&
        this.state.page >= 1 &&
        this.state.data.length !== 0
      )
        return {
          page: prevState.page + 1,
          start: prevState.start + 10,
          end: prevState.end + 10
        };
      else if (
        this.state.page === this.state.pages &&
        this.state.data.length !== 0
      )
        return { page: 1, start: 0, end: 9 };
    });
    this.changeActivePage();
  }

  prevPage() {
    this.setState((prevState) => {
      if (
        this.state.page <= this.state.pages &&
        this.state.page > 1 &&
        this.state.data.length !== 0
      )
        return {
          page: prevState.page - 1,
          start: prevState.start - 10,
          end: prevState.end - 10
        };
      else if (this.state.page === 1 && this.state.data.length !== 0)
        return {
          page: this.state.pages,
          start: (this.state.pages - 1) * 10,
          end: this.state.pages * 10 - 1
        };
    });
    this.changeActivePage();
  }
  pagesInit(length) {}
  changeActivePage() {}
  clearActivePage() {}

  search() {
    let text = document.getElementById("search-text").value;

    if (text !== "") {
      let sort = document.getElementById("sort-item").value;
      let url = "https://api.github.com/search/repositories?q=" + text;

      if (sort === "stars") url += "&sort=" + sort;
      if (sort === "forks") url += "&sort=" + sort;
      if (sort === "followers") url += "&sort=" + sort;

      axios(url)
        .then((response) => {
          if (response.data.items.length !== 0)
            this.setState(() => {
              return {
                data: response.data.items,
                page: 1,
                start: 0,
                end: 9,
                pagination: "visible",
                pages: 3
              };
            });
          else alert("Результат не найден");
        })
        .catch((error) => {
          alert("Не удалось обработать: '" + text + "'.");
        });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      start: 0,
      end: 9,
      pagination: "non-visible",
      pages: 1
    };
  }

  getRepos() {
    axios("https://api.github.com/repositories?since=1000").then((response) => {
      this.setState(() => {
        return {
          data: response.data,
          pagination: "visible",
          page: 1,
          start: 0,
          end: 9,
          pages: 10
        };
      });
    });
  }

  render() {
    return (
      <div class="cont" align="center">
        {this.pagesInit(10)}
        <button type="button" class="but">
          Данные о репозиториях GitHub lab11
        </button>
        <div id="search">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <select id="sort-item" class="custom-select">
                  <option value="none">Без сортировки</option>
                  <option value="stars">Сортировать по Stars</option>
                  <option value="forks">Сортировать по Forks</option>
                  <option value="followers">Сортировать по Followers</option>
                </select>
              </div>
              <div class="col-sm">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with radio button"
                  id="search-text"
                />
              </div>{" "}
              <div class="col-sm">
                <button class="but" onClick={() => this.search()}>
                  Поиск
                </button>
              </div>
            </div>
          </div>
        </div>
        <RepoCheck
          data={this.state.data}
          start={this.state.start}
          end={this.state.end}
        />
        <div id={this.state.pagination}>
          <button
            class="but"
            type="button"
            id="prev"
            onClick={() => this.prevPage()}
          >
            Предыдущая
          </button>
          {this.arrPages.map((el, index) => {
            if (index < this.state.pages)
              return (
                <div className="pages" key={index} id={index + 1}>
                  {index + 1}
                </div>
              );
          })}
          <button
            class="but"
            type="button"
            id="next"
            onClick={() => this.nextPage()}
          >
            Следующая
          </button>
        </div>
        {this.clearActivePage()}
        {this.changeActivePage()}
      </div>
    );
  }
}

export default App;
