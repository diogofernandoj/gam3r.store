import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export interface RatingReviewProps {
  rating: number;
  size?: number;
}

export default function RatingReview(props: RatingReviewProps) {
  function ratingStars(rating: number) {
    const stars: any[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <Ionicons key={i} name="star" size={16} style={styles.icone} />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <Ionicons key={i} name="star-half" size={16} style={styles.icone} />
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name="star-outline"
            size={16}
            style={styles.icone}
          />
        );
      }
    }
    return stars;
  }

  return <View style={styles.container}>{ratingStars(props.rating)}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 0.5,
    color: "#34d399",
  },
  icone: {
    color: "#34d399",
  },
});
