package kr.or.connect.todo.dto;

public class TodoDto {
	private Integer todoId;
	private String name;
	private String regDate;
	private Integer sequence;
	private String title;
	private String type;
	
	public TodoDto() {
		
	}
	
	public TodoDto(Integer todoId, String name, String regDate, Integer sequence, String title, String type) {
		super();
		this.todoId = todoId;
		this.name = name;
		this.regDate = regDate;
		this.sequence = sequence;
		this.title = title;
		this.type = type;
	}
	
	public Integer getTodoId() {
		return todoId;
	}
	public void setTodoId(Integer todoId) {
		this.todoId = todoId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public Integer getSequence() {
		return sequence;
	}
	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	@Override
	public String toString() {
		return "TodoDto [todoId=" + todoId + ", name=" + name + ", regDate=" + regDate + ", sequence=" + sequence
				+ ", title=" + title + ", type=" + type + "]";
	}	
	
}
