import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";

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

    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb"
      }}

      contentContainerStyle={{
        padding: 20,
        paddingTop: 60,
        paddingBottom: 40
      }}
    >

      <Text style={{
        fontSize: 28,
        fontWeight: "bold",
        color: "#1e293b",
        marginBottom: 5
      }}>
         Produtos
      </Text>

      <Text style={{
        fontSize: 15,
        color: "#64748b",
        marginBottom: 30
      }}>
        Cadastre e visualize seus produtos
      </Text>

      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}

        style={{
          backgroundColor: "#fff",
          borderRadius: 14,
          padding: 16,
          marginBottom: 18,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e2e8f0"
        }}
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"

        style={{
          backgroundColor: "#fff",
          borderRadius: 14,
          padding: 16,
          marginBottom: 20,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e2e8f0"
        }}
      />

      <TouchableOpacity
        onPress={salvarProduto}

        style={{
          backgroundColor: "#2563eb",
          padding: 16,
          borderRadius: 14,
          alignItems: "center",
          marginBottom: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}
      >
        <Text style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16
        }}>
          SALVAR PRODUTO
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={carregarProdutos}

        style={{
          backgroundColor: "#2563eb",
          padding: 16,
          borderRadius: 14,
          alignItems: "center",
          marginBottom: 35,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}
      >
        <Text style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16
        }}>
          VER PRODUTOS
        </Text>
      </TouchableOpacity>

      {produtos.length > 0 && (

        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#1e293b",
          marginBottom: 20
        }}>
           Lista de Produtos
        </Text>
      )}

      {produtos.map((item, index) => (

        <View
          key={index}

          style={{
            backgroundColor: "#fff",
            borderRadius: 18,
            padding: 18,
            marginBottom: 15,

            shadowColor: "#000",

            shadowOffset: {
              width: 0,
              height: 2
            },

            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 3
          }}
        >

          <Text style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#0f172a",
            marginBottom: 8
          }}>
            {item.nome || "Produto sem nome"}
          </Text>

          <View style={{
            alignSelf: "flex-start",
            backgroundColor: "#2563eb",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 999
          }}>
            <Text style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 14
            }}>
              R$ {item.preco || 0}
            </Text>
          </View>

        </View>
      ))}

    </ScrollView>
  );
}
