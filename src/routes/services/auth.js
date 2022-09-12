// checking whether has contains token or ot, if not getting it from
// local storage since we are redirected to the login page

export async function fetchAuthToken() {
    const hashKey = window.location.hash
    let tokenGenerated = window.localStorage.getItem("token")

    if (!tokenGenerated && hashKey) {
      tokenGenerated = hashKey.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hashKey = ""
      window.localStorage.setItem("token", tokenGenerated)
    }
    return tokenGenerated;
  }
  