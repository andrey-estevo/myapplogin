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
    <View style={{ padding: 20 }}>

      <Text>Cadastro de Produto</Text>

      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <Button
        title="Salvar Produto"
        onPress={salvarProduto}
      />

      <Button
        title="Ver Produtos"
        onPress={carregarProdutos}
      />

      {produtos.map((item, index) => (
        <Text key={index}>
          {item.nome} - R$ {item.preco}
        </Text>
      ))}

    </View>
  );
}