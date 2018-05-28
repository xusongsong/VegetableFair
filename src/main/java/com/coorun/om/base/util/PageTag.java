package com.coorun.om.base.util;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

public class PageTag extends TagSupport{

	private static final long serialVersionUID = 1L;
	//存储业务数据
	private Pager page;
	// 每页固定条数	
	private int pageSize = 20;
	// 请求url
	private String url ;
	//是否显示总条数信息
	private boolean desc = false;
	
	public int doStartTag() throws JspException {
		
		StringBuilder tagContent = new StringBuilder();
        //组织自定义分页标签的css样式表
        tagContent
                  .append("<style type='text/css'>")
                  .append(".pagination {padding:5px;float:center;font-size:12px;}")
                  .append(".pagination a, .pagination a:link, .pagination a:visited {padding:2px 5px;margin:2px;boder:1px solid #aaaadd;text-decoration:none;color:#006699;}")
                  .append(".pagination a:hover, .pagination a:active {border:1px solid #ff0000;font-weight: bold;background-color: #ff0000; color: #FFF;}")
                  .append(".pagination span.disabled {padding: 2px 5px;margin: 2px;border: 1px solid #eee; color: #ddd;}")
                  .append("</style>");
                  //自定义标签的标签体内容
                  tagContent.append("<div class='pagination'>");
                  if(page.getTotalRecords() == 0){
                      //没有查询到结果记录集，则提示没有显示数据
                    tagContent.append("<strong>没有可显示的项目</strong>&nbsp;&nbsp;");
                  }else{
                      //查询结果有显示数据时，则进行分页处理
                      tagContent.append("<form method='get' action='");
                      tagContent.append(this.getUrl());
                      tagContent.append("' name='qPagerForm'>");
                      //自定义标签的隐藏属性，用来进行页码变换时的表单数据：页码和页面大小
                      tagContent.append("<input type='hidden' name='pageNo' value='");
                      tagContent.append(page.getPageNo());
                      tagContent.append("'/>");
                      tagContent.append("<input type='hidden' name='pageSize' value='");
                      tagContent.append(this.getPageSize());
                      tagContent.append(" '/>");
                      if(isDesc()){
                    	  tagContent.append("&nbsp;共<strong>");
                          tagContent.append(page.getTotalRecords());
                          tagContent.append("</strong>条，<strong>");
                          tagContent.append(page.getTotalPage());
                          tagContent.append("</strong>页：&nbsp;");
                      }
                      
                      //当前页为第一页时，则上一页不能显示超链接
                      if(page.getPageNo() == 1){
                    	  tagContent.append("<span class='disabled'>&laquo;</span>");
                          tagContent.append("<span class='disabled'>&nbsp;上一页</span>");
                      }else{
                          //当前页不为第一页时，则进行页面链接处理
                    	  tagContent.append("<a href='javaScript:turnOverPage(")
                          .append(1).append(")'>&laquo;</a>&nbsp;&nbsp;");
                          tagContent.append("<a href='javaScript:turnOverPage(")
                          .append((page.getPageNo() - 1)).append(")'>&nbsp;上一页</a>&nbsp;&nbsp;");
                      }
                      
                      for(int i=page.getStartIndex();i<page.getEndIndex()+1;i++){
                          if(page.getPageNo() ==i){
                              //当前页号不需要超链接
                            tagContent.append("<span class='current'>").append(i).append("</span>&nbsp;&nbsp;");
                          }else{
                              //当前页前后的几页需要加上超链接
                              tagContent.append("<a href='javaScript:turnOverPage(").append(i)
                              .append(")'>").append(i).append("</a>&nbsp;&nbsp;");
                          }
                      }
                     //下一页处理
                     if(page.getPageNo() == page.getTotalPage()){
                         //如果当前页数为最后一页，则不需要超链接
                         tagContent.append("<span class='disabled'>下一页&nbsp;").append("</span>&nbsp;&nbsp;");
                         tagContent.append("<span class='disabled'>&raquo;").append("</span>&nbsp;&nbsp;");
                     }else{
                         //下一页的超链接可以使用
                         tagContent.append("<a href='javaScript:turnOverPage(").append((page.getPageNo() + 1)).append(")'>下一页&nbsp;</a>&nbsp;&nbsp;");
                         tagContent.append("<a href='javaScript:turnOverPage(").append(page.getTotalPage()).append(")'>&raquo;</a>&nbsp;&nbsp;");
                     }
                     tagContent.append("</from>");
                     //拼写js处理函数：当用户点击某一页时，需要将这一页的页码赋值给隐藏表单域，
                     //用来将其作为表单发送给分页响应的servlet
                     tagContent.append("<script language='javaScript'>");
                     tagContent.append("function turnOverPage(no){");
                     tagContent.append("if(no>");
                     tagContent.append(page.getTotalPage());
                     tagContent.append("){no=");
                     tagContent.append(page.getTotalPage());
                     tagContent.append(";}");
                     tagContent.append("if(no<1){no=1;}");
                	 tagContent.append("document.qPagerForm.pageNo.value=no;");
                     tagContent.append("document.qPagerForm.submit();");
                     tagContent.append("}");
                     tagContent.append("</script>");
                     tagContent.append("</div>");
                  }
                  //输出标签的内容到前台页面
                  try {
                      this.pageContext.getOut().write(tagContent.toString());
                  } catch (IOException e) {
                      //自定义标签输出错误
                     System.out.println("自定义标签输出错误：" + e.getMessage());
                  }
		
		return SKIP_BODY;
	}

	

	@Override
	public int doEndTag() throws JspException {
		// TODO Auto-generated method stub
		return super.doEndTag();
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	public Pager getPage() {
		return page;
	}
	public void setPage(Pager page) {
		this.page = page;
	}



	public boolean isDesc() {
		return desc;
	}



	public void setDesc(boolean desc) {
		this.desc = desc;
	}
	
}
