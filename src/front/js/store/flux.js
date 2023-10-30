const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            login: async (email, password) => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    });
                    let data = await response.json();
                    if (data) {
                        console.log(data);
                        sessionStorage.setItem("token", data.access_token);
                        setStore({ token: data.access_token });
                        return true;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            logout: () => {
                sessionStorage.removeItem("token");
                setStore({ token: null });
            },
            syncSessionToken: () => {
                const token = sessionStorage.getItem("token");
                if (token && token !== '' && token !== undefined) {
                    setStore({ token: token });
                }
            },
            getMessage: async (email, password) => {  
				const store=getStore();

                const options = {
                    headers: {
                        "Authorization": 'Bearer ' + store.token
                    },
                    
                };
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello", options);
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        } 
    };  
};

export default getState;