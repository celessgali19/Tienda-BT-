
export async function jsonAsync(url: string, method = 'GET', data: any, headers: HeadersInit = {}, json = true) {

  try {
    let body
    if (data) {
      body = JSON.stringify(data)
    }

    const res = await fetch(url, {
      method,
      body,
      headers: {
        'origin-route': url,
        'Content-type': 'application/json; charset=UTF-8',
        ...headers,
      },
    });

    const response = json && res.headers.get('Content-Length') !== '0' ? await res.json() : null
    return {
      ok: (res.ok && res.status === 200) ,
      status: res.status,
      body: response,
    }
  } catch (e) {
    console.error("Error en la solicitud: ", e);
    return {
      ok: false,
      body: "Error al procesar la solicitud",
      status: 500,
    }
  }
}

