export default {
  async getLocations() {
    const json = await (await fetch("/api/GetLocations")).json();
    return json;
  },

  async getFeed() {
    const res = await fetch(`/api/GetVideos`);
    const { updates } = await res.json();
    return updates;
  },

  async getAvatar() {
    const res = await fetch("/api/getGitHubAvatar");
    const { image } = await res.json();
    return image;
  }
}

