const editBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-edit").value.trim();
  const content = document.querySelector("#content-edit").value.trim();
  const blogId = document.getElementById("edit-blog").dataset.blogid;

  if (title && content) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert("Oopsie, couldn't update your post!");
    }
  }
};

const deleteBlogHandler = async (event) => {
  event.preventDefault();

  const blogId = document.getElementById("delete-blog").dataset.blogid;

  const response = await fetch(`/api/posts/${blogId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert("Oopsie, couldn't delete your post!");
  }
};

document
  .getElementById("delete-blog")
  .addEventListener("click", deleteBlogHandler);
document
  .querySelector(".blog-edit-form")
  .addEventListener("submit", editBlogHandler);
