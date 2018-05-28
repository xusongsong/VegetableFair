package com.coorun.icgis.jites.geodo.api.client;
//package com.coorun.icgis.jites.geodo.api.client;
//
//import java.security.cert.CertificateException;
//import java.security.cert.X509Certificate;
//
//import javax.net.ssl.SSLContext;
//import javax.net.ssl.TrustManager;
//import javax.net.ssl.X509TrustManager;
//
//import org.apache.http.HttpRequest;
//import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
//import org.apache.http.entity.StringEntity;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClientBuilder;
//
//import com.coorun.icgis.jites.common.http.client.api.client.impl.JitesClient;
//import com.coorun.icgis.jites.common.http.client.api.client.request.JitesRequest;
//import com.coorun.icgis.jites.common.util.JSONUtils;
//import com.coorun.icgis.jites.geodo.api.request.GeodoRequest;
//import com.coorun.icgis.jites.geodo.common.EasemobUtils;

//public class GeodoClient extends JitesClient {

//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = -6339177837600470952L;
//
//	public GeodoClient(String url) {
//		super(url);
//	}
//
//	@Override
//	public CloseableHttpClient initHttpClient(HttpClientBuilder build) {
//		
//		if (this.getUrl().startsWith("https")) {
//			
//			X509TrustManager xtm = new X509TrustManager() {
//				public void checkClientTrusted(X509Certificate[] chain,
//						String authType) throws CertificateException {
//				}
//
//				public void checkServerTrusted(X509Certificate[] chain,
//						String authType) throws CertificateException {
//				}
//
//				public X509Certificate[] getAcceptedIssuers() {
//					return null;
//				}
//			};
//
//			try {
//				SSLContext ctx = SSLContext.getInstance("TLS");
//				ctx.init(null, new TrustManager[] { xtm }, null);
//				build.setSslcontext(ctx);
//			} catch (Exception e) {
//				throw new RuntimeException();
//			}
//			
//		}
//		
//		return super.initHttpClient(build);
//	}
//
//	@SuppressWarnings("rawtypes")
//	@Override
//	public void setRequestHeader(HttpRequest request, JitesRequest req ) {
//
//		if (req instanceof JitesRequest) {
//			
//			GeodoRequest tmp = (GeodoRequest)req;
//			
//			tmp.verify();
//			
//			if (tmp.isRequireRequestBody()) {
//				StringEntity se = new StringEntity(JSONUtils.converterToString(req, false), "UTF-8");
//				((HttpEntityEnclosingRequestBase)request).setEntity(se);
//			}
//			
//			if (tmp.isRequireBearer()) {
////				request.setHeader("Authorization", String.format("Bearer %s", EasemobUtils.getToken().getAccess_token()));
//			}
//		}
//		request.setHeader("Content-Type", "application/json");
//	}
//}
