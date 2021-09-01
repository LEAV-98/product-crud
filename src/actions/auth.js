import { firebase } from "../firebase/firebase-config";
import { types } from "../types/types";
import Swal from "sweetalert2";
const verifyRole = (uid) => {
  firebase
    .firestore()
    .collection("roles")
    .onSnapshot((snapshot) => {
      const rol = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      // console.log(rol);
      return rol[0];
    });
};
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // console.log(user);
        if (user.uid === verifyRole(user.uid)) {
          //uid del admin
          dispatch(login(user.uid, user.displayName, user.email));
          Swal.fire({
            title: "Bienvenido Admin",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Credenciales Inválidas",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };
};
export const login = (uid, displayName, email) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    email,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    Swal.fire({
      title: "Hasta Luego!",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
  };
};

export const logout = () => ({
  type: types.logout,
});
