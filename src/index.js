import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");
const createArticles = (articles) => {
  const articlesDom = articles.map((article) => {
    const articleDom = document.createElement("div");
    articleDom.classList.add("article");
    articleDom.innerHTML = `
                    <img src="${article.img}" alt="profil" />
                    <h2>${article.title}</h2>
                    <p class="article-author">${article.author} - ${article.category}</p>
                    <p class="article-content">
                        ${article.content}
                    </p>
                    <div class="article-action">
                        <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
                    </div> 
    `;
    return articleDom;
  });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDom);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id");
        try {
            const response = await fetch(`https://restapi.fr/api/article/${id}`, {
            method: "DELETE",
            });
            const body = await response.json();
            console.log(body);
            fetchArticle();
        } catch (e) {
            console.error("e : ", e);
        }
        });
    });
};

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/article");
    let articles = await response.json();
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    createArticles(articles);
  } catch (error) {
    console.log("error");
  }
};

fetchArticle();
