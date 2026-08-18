public class Student {
    private String name;
    private int id;
    private String course;

    public Student(String name, int id, String course) {
        this.name = name;
        this.id = id;
        this.course = course;
        
    }

    public void displayInfo() {
        System.out.println("Student: " + name + ", ID: " + id + ", Course: " + course);
    }
}