import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { Link, useRouter } from "expo-router";
import { useState } from "react";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Index(){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  async function handleSignIn(){

    if(!email || !senha){
      Alert.alert("Erro", "Preencha e-mail e senha");
      return;
    }

    try{

      await signInWithEmailAndPassword(auth, email, senha);

      Alert.alert("Sucesso", "Login realizado");

      router.replace("./produtos");

    }catch(error:any){

      Alert.alert("Erro", error.message);

    }
  }

  return(
    <KeyboardAvoidingView 
      style={{flex:1}}
      behavior={Platform.select({ios:"padding", android:"height"})}
    >

      <ScrollView 
        contentContainerStyle={{ flexGrow:1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.container}>

          <Image 
            source={require('@/assets/image1.png')}
            style={styles.ilustration} 
          />

          <Text style={styles.title}>Entrar</Text>

          <Text style={styles.subtitle}>
            Acesse sua conta com e-mail e senha
          </Text>

          <View style={styles.form}>

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
            />

            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={setSenha}
            />

            <Button
              label="Entrar"
              onPress={handleSignIn}
            />

          </View>

          <Text style={styles.footerText}>
            Não tem uma conta?

            <Link href="/signup" style={styles.footerLink}>
              {" "}Cadastre-se aqui
            </Link>

          </Text>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#FDFDFD",
    padding:32
  },

  ilustration:{
    width: "100%",
    height: 330,
    resizeMode:"contain",
    marginTop:62
  },

  footerText:{
    textAlign:"center",
    marginTop:24,
    color:"#585860",
  },

  footerLink:{
    color:"#0929b8",
    fontWeight:"700"
  },

  form: {
    marginTop:24,
    gap:12
  },

  title:{ 
    fontSize: 32,
    fontWeight:"900",
  },

  subtitle:{
    fontSize:16,
  }
})