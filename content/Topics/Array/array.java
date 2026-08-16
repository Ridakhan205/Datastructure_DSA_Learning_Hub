import java.util.Arrays;

public class array {

    // Array used for algorithm demonstration
    static int[] values = {100, 12, 56, 23, 78, 45, 90, 11, 67, 29, 86};

    // ================= LINEAR SEARCH =================
    static void linearSearch(int key) {
        System.out.println("----- Linear Search Dry Run -----");

        for (int i = 0; i < values.length; i++) {
            System.out.println("Step " + (i + 1) +
                    ": Compare " + values[i] + " with " + key);

            if (values[i] == key) {
                System.out.println("Result: Element FOUND at index " + i);
                return;
            }
        }

        System.out.println("Result: Element NOT FOUND");
    }

    // ================= QUICK SORT =================
    static void quickSort() {
        int[] sorted = values.clone();
        Arrays.sort(sorted);

        System.out.println("\n----- Quick Sort Dry Run -----");
        for (int i = 0; i < sorted.length; i++) {
            System.out.println("Place " + sorted[i] + " at index " + i);
        }
    }

    // ================= MAIN =================
    public static void main(String[] args) {

        System.out.println("Original Array:");
        System.out.println(Arrays.toString(values));

        System.out.println();
        linearSearch(23);   // Example search

        System.out.println();
        quickSort();
    }
}
