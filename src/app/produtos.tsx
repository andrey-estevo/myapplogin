import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Produtos() {

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);

  async function salvarProduto() {
    await addDoc(collection(db, "produtos"), {
      nome: nome,
      preco: Number(preco)
    });

    setNome("");
    setPreco("");

    alert("Produto salvo!");
  }

  async function carregarProdutos() {

    const querySnapshot = await getDocs(collection(db, "produtos"));

    const lista:any[] = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    setProdutos(lista);
  }

  return (
    <View style={{ 
      flex: 1,
      padding: 20,
      paddingTop: 60,
      backgroundColor: "#fff"
    }}>

      <Text style={{ 
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30
      }}>
        Cadastro de Produto
      </Text>

      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 15,
          marginBottom: 20,
          fontSize: 16
        }}
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 15,
          marginBottom: 25,
          fontSize: 16
        }}
      />

      <View style={{ marginBottom: 15 }}>
        <Button
          title="Salvar Produto"
          onPress={salvarProduto}
        />
      </View>

      <View style={{ marginBottom: 30 }}>
        <Button
          title="Ver Produtos"
          onPress={carregarProdutos}
        />
      </View>

      {produtos.map((item, index) => (
        <Text 
          key={index}
          style={{
            fontSize: 16,
            marginBottom: 10,
            padding: 12,
            backgroundColor: "#f5f5f5",
            borderRadius: 8
          }}
        >
          {item.nome} - R$ {item.preco}
        </Text>
      ))}

    </View>
  );
}
