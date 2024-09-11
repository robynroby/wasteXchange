import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { WasteXchange_backend } from "../../../../declarations/wasteXchange_backend";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [faulty, setFaulty] = useState(false); // New state for faulty

  function handleSubmit(event) {
    event.preventDefault();
    // Call the backend function with the new faulty parameter
    WasteXchange_backend.addHospital(Number(id), name, location, faulty).then((response) => {
      setGreeting(response);
    });
    return false;
  }

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };

  return (
    <Box m="20px">
      <Header title="Add new device" subtitle="Create a new device profile" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                id="id"
                type="number"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                variant="filled"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                id="location"
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onBlur={handleBlur}
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;


// import { useState } from 'react';
// import { WasteXchange_backend } from "../../declarations/WasteXchange_backend";

// function App() {
//   const [greeting, setGreeting] = useState('');
//   const [id, setId] = useState('');
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState('');
//   const [faulty, setFaulty] = useState(false); // New state for faulty

//   function handleSubmit(event) {
//     event.preventDefault();
//     // Call the backend function with the new faulty parameter
//     WasteXchange_backend.addHospital(Number(id), name, location, faulty).then((response) => {
//       setGreeting(response);
//     });
//     return false;
//   }

//   return (
//     <main>
//       <h1>Hospital Management</h1>
//       <br />
//       <br />
//       <form action="#" onSubmit={handleSubmit}>
//         <label htmlFor="id">ID: &nbsp;</label>
//         <input
//           id="id"
//           type="number"
//           placeholder="ID"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//         />
//         <br />
//         <label htmlFor="name">Name: &nbsp;</label>
//         <input
//           id="name"
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br />
//         <label htmlFor="location">Location: &nbsp;</label>
//         <input
//           id="location"
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <br />
//         <label htmlFor="faulty">Faulty Device: &nbsp;</label>
//         <input
//           id="faulty"
//           type="checkbox"
//           checked={faulty}
//           onChange={(e) => setFaulty(e.target.checked)}
//         />
//         <br />
//         <button type="submit">Add Hospital</button>
//       </form>
//       <section id="greeting">{greeting}</section>
//     </main>
//   );
// }

// export default App;