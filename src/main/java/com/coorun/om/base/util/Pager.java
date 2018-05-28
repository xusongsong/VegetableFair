package com.coorun.om.base.util;

import java.util.List;

/**
 * 分页工具类
 * 
 * @author Billy
 *
 * @param <T>
 */
public class Pager<T> {

	private List<T> records; // 分页数据结果集

	private int totalRecords; // 总记录条数

	private int pageNo = 1; // 当前页

	private int pageSize = 10; // 每页显示条数

	private int totalPage; // 总页数

	private int startIndex; // 开始索引

	private int endIndex; // 结束索引

	private int indexCount = 4; // 显示索引条目

	public Pager() {

	}

	public Pager(List<T> records, int totalRecords, int pageNo, int pageSize) {
		this.records = records;
		this.totalRecords = totalRecords;
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		// 获取总页数
		totalPage = (totalRecords % pageSize) == 0 ? (totalRecords / pageSize) : (totalRecords / pageSize) + 1;

		if (pageNo < 1) {
			this.pageNo = 1;
		}
		if (pageNo > totalPage) {
			this.pageNo = totalPage;
		}

		startIndex = indexCount / 2;

		startIndex = pageNo - (indexCount % 2 == 0 ? (startIndex - 1) : startIndex);

		endIndex = pageNo + indexCount / 2;

		if (startIndex < 1) {
			startIndex = 1;
			if (totalPage >= indexCount) {
				endIndex = indexCount;
			} else {
				endIndex = totalPage;
			}
		}

		if (endIndex > totalPage) {
			endIndex = totalPage;
			if (endIndex > indexCount) {
				startIndex = endIndex - indexCount + 1;
			} else {
				startIndex = 1;
			}
		}
	}

	public List<T> getRecords() {
		int fromIndex = 0;

		if (pageNo != 1) {
			fromIndex = (pageNo - 1) * pageSize;
		}

		int toIndex = fromIndex + pageSize;

		if (toIndex > records.size()) {
			toIndex = records.size();
		}
		return records.subList(fromIndex, toIndex);
	}

	public void setRecords(List<T> records) {
		this.records = records;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

	public int getIndexCount() {
		return indexCount;
	}

	public void setIndexCount(int indexCount) {
		this.indexCount = indexCount;
	}

	@Override
	public String toString() {
		return "Pager [records=" + records + ", totalRecords=" + totalRecords + ", pageNo=" + pageNo + ", pageSize="
				+ pageSize + ", totalPage=" + totalPage + ", startIndex=" + startIndex + ", endIndex=" + endIndex
				+ ", indexCount=" + indexCount + "]";
	}

}
