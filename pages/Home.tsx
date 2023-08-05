import * as React from 'react';
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
export default function Home() {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://6e67-182-3-101-112.ngrok-free.app/users?page=${page}`)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                if (data.length == 0) {
                    setData(json.data);

                } else {
                    setData([...data, ...json.data]);

                }
            })
            .catch((error) => console.error(error));
    }, [page]);

    const fetchMoreData = () => {
        setPage(page + 1)
    }
    const renderItem = ({ item }: { item: any }) => (
        <Pressable style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.emailText}>{item.email}</Text>
            </View>
        </Pressable>
    );

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={renderItem}
                onEndReachedThreshold={0.2}
                onEndReached={fetchMoreData}
            />

        </View>
    );
};


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    textContainer: {
        marginLeft: 16,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    emailText: {
        fontSize: 12,
    },
});