import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  Alert,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { styles } from "./styles"
import { colors } from "../styles/colors"
import { Link } from "@/components/link"
import { Categories } from "@/components/categories"
import { linkStorage, LinkStorage } from "@/storage/link-storage"
import { Option } from "@/components/option"
import { router, useFocusEffect } from "expo-router"
import { useState, useCallback } from "react"
import { categories } from "@/utils/categories"
export default function Index() {
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage)
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [category, setCategory] = useState(categories[0].name)

  async function getLinks() {
    try {
      const response = await linkStorage.get()

      const filtered = response.filter((link) => link.category === category)

      setLinks(filtered)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar os links")
    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true)
    setLink(selected)
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id)
      getLinks()
      setShowModal(false)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o link")
    }
  }

  function handleRemove() {
    Alert.alert("Remover", "Deseja realmente remover o link?", [
      { style: "cancel", text: "Não" },
      { text: "Sim", onPress: linkRemove }
    ])
  }

  useFocusEffect(useCallback(() => {
    getLinks()
  }, [category]))

  return (
    <><View style={styles.container}>
      <View style={styles.header}>

        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => setShowModal(false)}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>

      </View>
    </View>

      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)} />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false} />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{link.category}</Text>
              <TouchableOpacity>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove} />
              <Option
                name="Abrir"
                icon="language" />
            </View>
          </View>
        </View>
      </Modal> </>
  )
}


