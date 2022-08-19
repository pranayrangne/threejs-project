import React, { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { proxy, useSnapshot } from "valtio";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { HexColorPicker } from "react-colorful";
import * as Yup from 'yup';
const state = proxy({
  current: null,
  items: {
    fef7f7: "#ffffff",
    ffffff: "#ffffff",
    rightside: "#ffffff",
    None: "#ffffff",
    Physical11: "#ffffff",
    Physical12: "#ffffff",
    Physical15: "#ffffff",
    Physical2: "#ffffff",
    Physical7: "#ffffff",
    Physical9: "#ffffff",
    Standard5: "#ffffff",
    Standard6: "#ffffff",
    d3ebc: "#ffffff",
  },
});
// Book Shoe Form Start
export const BookForm = () => {

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    brandName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    price: Yup.number().required('Required').positive('positive number only').integer(),
    size: Yup.number().required('Required').positive('positive number only').integer(),
  });
  const [book, setBook] = useState(false);
  return (
    <Html>
      <Box
        border={1}
        style={{
          display: book ? "inline-block" : "none",
          backgroundColor: "#f5f5f5",
          padding: "5px",
          width: "200px",
          borderRadius: "5px",
          position: "absolute",
          left: "100px",
          top: "-60px",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            component="h5"
            style={{ padding: "auto", margin: "auto" }}
          >
            Cusotmize Shoe Details
          </Typography>
          <br />
          <Formik
            initialValues={{
              brandName: "",
              price: "",
              size: "",
              email: "",
            }}
           validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                values.brandName = ''
                values.price = ''
                values.size = ''
                values.email = ''
                setSubmitting(false);
              }, 400);
             
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  error={errors.brandName ? true:false}
                  type="text"
                  name="brandName"
                  value={values.brandName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="standard-basic"
                  label="Brand *"
                  variant="standard"
                />
                <br />
                {errors.brandName && touched.brandName && errors.brandName}
                <TextField
                  error={errors.size? true:false}
                  type="number"
                  name="size"
                  value={values.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="standard-basic"
                  label="Size *"
                  variant="standard"
                />
                <br />
                {errors.size && touched.size && errors.size}
                <TextField
                error={errors.price? true:false}
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="standard-basic"
                  label="Price *"
                  variant="standard"
                />
                <br />
                {errors.price && touched.price && errors.price}
                <TextField
                  error={errors.email? true:false}
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="standard-basic"
                  label="Email *"
                  variant="standard"
                />
                {errors.email && touched.email && errors.email}
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ margin: 1 }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
      <Box
        sx={{
          width: "200px",
          position: "absolute",
          bottom: "300px",
          left: "200px",
        }}
      >
        <Button onClick={() => setBook(!book)} variant="contained">
          {book ? "Close Booking" : "Book Shoe"}
        </Button>
      </Box>
    </Html>
  );
};
// Book Shoe Form End
// Color Picker to change Shoe Color
export const Picker = () => {
  const snap = useSnapshot(state);
  return (
    <div>
      <div style={{ display: snap.current ? "block" : "none",width:'200px' }}>
      <HexColorPicker
        className="picker"
        color={snap.items[snap.current]}
        onChange={(color) => (state.items[snap.current] = color)}
      />
        <h1>
          <Typography variant="body1">Node Selected: {snap.current}</Typography>
            <Button variant="contained" onClick={()=> state.current = null} >Submit</Button>
           </h1>
      </div>
    </div>
  );
};
// Color Picker to change Shoe Color End

export function Model(props) {
  const { nodes, materials } = useGLTF("/scene.glb");
  const ref = useRef();
  const snap = useSnapshot(state);
  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    ref.current.rotation.x = Math.cos(t / 4) / 8;
    ref.current.rotation.y = Math.sin(t / 4) / 8;
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });
  const handlClick = (e) => {
    e.stopPropagation();
    state.current = e.object.material.name;
    state.items[e.object.material.name] = "#ffffff";
  };

  return (
    <group
      ref={ref}
      {...props}
      onClick={handlClick}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-114.99, 200.37, 10.16]}>
          <mesh
            geometry={nodes.Object_3.geometry}
            material={materials["706a6a"]}
          />
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials.Physical11}
            material-color={snap.items.Physical11}
          />
          <mesh
            geometry={nodes.Object_5.geometry}
            material={materials.Physical12}
            material-color={snap.items.Physical12}
          />
          <mesh
            geometry={nodes.Object_6.geometry}
            material={materials.Physical15}
            material-color={snap.items.Physical15}
          />
          <mesh
            geometry={nodes.Object_7.geometry}
            material={materials.Physical2}
            material-color={snap.items.Physical2}
          />
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials.Physical7}
            material-color={snap.items.Physical7}
          />
          <mesh
            geometry={nodes.Object_9.geometry}
            material={materials.Physical9}
            material-color={snap.items.Physical9}
          />
          <mesh
            geometry={nodes.Object_10.geometry}
            material={materials.Standard5}
            material-color={snap.items.Standard5}
          />
          <mesh
            geometry={nodes.Object_11.geometry}
            material={materials.Standard6}
            material-color={snap.items.Standard6}
          />
          <mesh
            geometry={nodes.Object_12.geometry}
            material={materials.d3ebc}
            material-color={snap.items.d3ebc}
          />
          <mesh
            geometry={nodes.Object_13.geometry}
            material={materials.fef7f7}
            material-color={snap.items.fef7f7}
          />
          <mesh
            geometry={nodes.Object_14.geometry}
            material={materials.ffffff}
            material-color={snap.items.ffffff}
          />
          <mesh
            geometry={nodes.Object_15.geometry}
            material={materials.rightside}
            material-color={snap.items.rightside}
          />
          <mesh
            geometry={nodes.Object_16.geometry}
            material={materials.None}
            material-color={snap.items.None}
          />
          <mesh geometry={nodes.Object_17.geometry} material={materials.None} />
          <mesh geometry={nodes.Object_18.geometry} material={materials.None} />
          <mesh
            geometry={nodes.Object_19.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_20.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_21.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_22.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_23.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_24.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_25.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_26.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_27.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_28.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_29.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_30.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_31.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_32.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_33.geometry}
            material={materials.b0b0b0}
          />
          <mesh
            geometry={nodes.Object_34.geometry}
            material={materials.b0b0b0}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
