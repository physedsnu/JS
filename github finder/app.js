document.addEventListener('DOMContentLoaded', () => {
  const searchUser = document.getElementById('searchUser');
  const searchButton = document.getElementById('searchButton');
  const spinner = document.getElementById('spinner');
  const profile = document.getElementById('profile');
  const latestRepos = document.getElementById('latestRepos');
  const grass = document.getElementById('grass');

  searchButton.addEventListener('click', async () => {
    const username = searchUser.value.trim();
    if (username) {
      spinner.style.display = 'block';
      
      try {
        const user = await fetchData(`https://api.github.com/users/${username}`);
        const repos = await fetchData(`https://api.github.com/users/${username}/repos?sort=created:desc&per_page=5`);
        
        displayUserInfo(user);
        displayUserRepos(repos);
        displayUserGrass(username);

      } catch (error) {
        profile.innerHTML = `<h2>Error: ${error.message}</h2>`;
        latestRepos.innerHTML = '';
        grass.innerHTML = '';
      }

      spinner.style.display = 'none';
    }
  });

  async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  }

  function displayUserInfo(user) {
    if (user && user.message !== 'Not Found') {
      const avatar = user.avatar_url || '';
      const name = user.name || '';
      const company = user.company || '';
      const followers = user.followers || '';
      const following = user.following || '';

      profile.innerHTML = `
        <img src="${avatar}" alt="Profile Picture" width="100">
        <h1>${name}</h1>
        <p>Company: ${company}</p>
        <p>Followers: ${followers}</p>
        <p>Following: ${following}</p>
      `;
    } else {
      profile.innerHTML = '<h2>User not found.</h2>';
    }
  }

  function displayUserRepos(repos) {
    if (repos && Array.isArray(repos)) {
      latestRepos.innerHTML = '<h2>Latest Repos</h2>' + repos.map(repo => `<p>${repo.name}</p>`).join('');
    } else {
      latestRepos.innerHTML = '<p>No repositories found.</p>';
    }
  }

  function displayUserGrass(username) {
    grass.innerHTML = `<img src="https://ghchart.rshah.org/${username}" alt="GitHub Contribution Chart"/>`;
  }
});
