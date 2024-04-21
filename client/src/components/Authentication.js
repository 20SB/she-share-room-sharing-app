import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Box,
  Flex,
  FileInput,
  NumberInput,
  Select,
  Textarea,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { useAuth } from "../context/AuthContext";

export function AuthenticationForm(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      age: null,
      maritalStatus: "",
      jobProfile: "",
      extraDetails: "",
      displayPicture: null,
      terms: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password should include at least 6 characters",
      age: (value) =>
        value >= 18 && value <= 120 ? null : "Age must be between 10 and 150",
      terms: (value) => (value ? null : "You must accept terms and conditions"),
    },
  });
  const { login, register } = useAuth();
  const handleLogin = () => {
    // console.log("handle login");
    // console.log("email", form.values.email, "password", form.values.password);
      login(form.values.email, form.values.password);
  };
  const handleRegister = (values) => {
  
        console.log("register hit")
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.name);
      formData.append("dp", values.displayPicture);
      formData.append("age", values.age);
      formData.append("maritalStatus", values.maritalStatus);
      formData.append("jobProfile", values.jobProfile);
      formData.append("otherDetails", values.extraDetails);

      for (const [key, value] of formData.entries()) {
        console.log(`Key: ${key}, Value: ${value}`);
      }
      register(formData);
    
  };

  return (
    <Flex justify="center" w={"100vw"} mt={"8vh"}>
      <Paper
        radius="md"
        p="xl"
        withBorder
        w={{ base: "90%", sm: "80%", lg: "40%" }}
      >
        <Text size="lg" fw={500}>
          Welcome to Mantine, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(handleRegister)}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                required
                placeholder="Your name"
                {...form.getInputProps("name")}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />

            {type === "register" && (
              <>
                <NumberInput
                  required
                  label="Age"
                  placeholder="Your Age"
                  {...form.getInputProps("age")}
                  radius="md"
                  min={10}
                  max={150}
                />
                <Select
                  required
                  label="Marital Status"
                  placeholder="Your Marital Status"
                  data={["Single", "Married", "Divorced", "Widowed", "Other"]}
                  {...form.getInputProps("maritalStatus")}
                  radius="md"
                  searchable
                />
                <TextInput
                  required
                  label="Job Profile"
                  placeholder="Your Job Profile"
                  {...form.getInputProps("jobProfile")}
                  radius="md"
                />
                <Textarea
                  label="Extra Details"
                  description="Extra details about yourself"
                  placeholder="Write a brief about yourself"
                  {...form.getInputProps("extraDetails")}
                  radius="md"
                />
                <FileInput
                  required
                  accept="image/png,image/jpeg"
                  label="Display Picture"
                  placeholder="Upload Image"
                  {...form.getInputProps("displayPicture")}
                  radius="md"
                />
                <Checkbox
                  label="I accept terms and conditions"
                  {...form.getInputProps("terms", { type: "checkbox" })}
                />
              </>
            )}
          </Stack>
          {type !== "register" && (
            <Group justify="space-between" mt="xl">
              <Button
                radius="xl"
                color="pink"
                onClick={() => {
                  form.setFieldValue("email", "guest@example.com");
                  form.setFieldValue("password", "testPass");
                }}
              >
                {" "}
                Get Guest Credentials
              </Button>
              <Button
                radius="xl"
                color="pink"
                onClick={() => {
                  form.setFieldValue("email", "host@example.com");
                  form.setFieldValue("password", "testPass");
                }}
              >
                {" "}
                Get Host Credentials
              </Button>
            </Group>
          )}

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            {type === "register" ? (
              <Button type="submit" radius="xl" >
                Register
              </Button>
            ) : (
              <Button radius="xl" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
