const newBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-create").value.trim();
  const content = document.querySelector("#content-create").value.trim();

  if (title && content) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Could not create blog!");
    }
  }
};

document.querySelector(".blog-form").addEventListener("submit", newBlogHandler);
