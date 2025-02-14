/*
 * Copyright 2015 The gRPC Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.grpc.examples.helloworld;

import io.grpc.Channel;
import io.grpc.Grpc;
import io.grpc.InsecureChannelCredentials;
import io.grpc.ManagedChannel;
import io.grpc.StatusRuntimeException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 * A simple client that requests a greeting from the {@link HelloWorldServer}.
 */
public class HelloWorldClient {
  private static final Logger logger = Logger.getLogger(HelloWorldClient.class.getName());

  private final GreeterGrpc.GreeterBlockingStub blockingStub;

  /** Construct client for accessing HelloWorld server using the existing channel. */
  public HelloWorldClient(Channel channel) {
    // 'channel' here is a Channel, not a ManagedChannel, so it is not this code's responsibility to
    // shut it down.

    // Passing Channels to code makes code easier to test and makes it easier to reuse Channels.
    blockingStub = GreeterGrpc.newBlockingStub(channel);
  }

  /** Say hello to server. */
  public void greet(String name) {
    logger.info("Will try to greet " + name + " ...");
    HelloRequest request = HelloRequest.newBuilder().setName(name).build();
    HelloReply response;
    try {
      response = blockingStub.sayHello(request);
    } catch (StatusRuntimeException e) {
      logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
      return;
    }
    logger.info("Greeting: " + response.getMessage());
  }

  /**
   * Greet server. If provided, the first element of {@code args} is the name to use in the
   * greeting. The second argument is the target server.
   */
  public static void main(String[] args) throws Exception {
    String user = "world";
    // Access a service running on the local machine on port 50051
    String target = "localhost:50051";
    // Allow passing in the user and target strings as command line arguments
    if (args.length > 0) {
      if ("--help".equals(args[0])) {
        System.err.println("Usage: [name [target]]");
        System.err.println("");
        System.err.println("  name    The name you wish to be greeted by. Defaults to " + user);
        System.err.println("  target  The server to connect to. Defaults to " + target);
        System.exit(1);
      }
      user = args[0];
    }
    if (args.length > 1) {
      target = args[1];
    }

    // Create a communication channel to the server, known as a Channel. Channels are thread-safe
    // and reusable. It is common to create channels at the beginning of your application and reuse
    // them until the application shuts down.
    //
    // For the example we use plaintext insecure credentials to avoid needing TLS certificates. To
    // use TLS, use TlsChannelCredentials instead.
    ManagedChannel channel = Grpc.newChannelBuilder(target, InsecureChannelCredentials.create())
        .build();
    try {
      HelloWorldClient client = new HelloWorldClient(channel);
      client.greet(user);
    } finally {
      // ManagedChannels use resources like threads and TCP connections. To prevent leaking these
      // resources the channel should be shut down when it will no longer be used. If it may be used
      // again leave it running.
      channel.shutdownNow().awaitTermination(5, TimeUnit.SECONDS);
    }
  }

  /**
   * <pre>
   * The greeting service definition.
   * </pre>
   */
  @javax.annotation.Generated(
      value = "by gRPC proto compiler (version 1.70.0)",
      comments = "Source: helloworld.proto")
  @io.grpc.stub.annotations.GrpcGenerated
  public static final class GreeterGrpc {

    private GreeterGrpc() {}

    public static final String SERVICE_NAME = "helloworld.Greeter";

    // Static method descriptors that strictly reflect the proto.
    private static volatile io.grpc.MethodDescriptor<io.grpc.examples.helloworld.HelloRequest,
        io.grpc.examples.helloworld.HelloReply> getSayHelloMethod;

    @io.grpc.stub.annotations.RpcMethod(
        fullMethodName = SERVICE_NAME + '/' + "SayHello",
        requestType = io.grpc.examples.helloworld.HelloRequest.class,
        responseType = io.grpc.examples.helloworld.HelloReply.class,
        methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
    public static io.grpc.MethodDescriptor<io.grpc.examples.helloworld.HelloRequest,
        io.grpc.examples.helloworld.HelloReply> getSayHelloMethod() {
      io.grpc.MethodDescriptor<io.grpc.examples.helloworld.HelloRequest, io.grpc.examples.helloworld.HelloReply> getSayHelloMethod;
      if ((getSayHelloMethod = GreeterGrpc.getSayHelloMethod) == null) {
        synchronized (GreeterGrpc.class) {
          if ((getSayHelloMethod = GreeterGrpc.getSayHelloMethod) == null) {
            GreeterGrpc.getSayHelloMethod = getSayHelloMethod =
                io.grpc.MethodDescriptor.<io.grpc.examples.helloworld.HelloRequest, io.grpc.examples.helloworld.HelloReply>newBuilder()
                .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
                .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SayHello"))
                .setSampledToLocalTracing(true)
                .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                    io.grpc.examples.helloworld.HelloRequest.getDefaultInstance()))
                .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                    io.grpc.examples.helloworld.HelloReply.getDefaultInstance()))
                .setSchemaDescriptor(new GreeterMethodDescriptorSupplier("SayHello"))
                .build();
          }
        }
      }
      return getSayHelloMethod;
    }

    /**
     * Creates a new async stub that supports all call types for the service
     */
    public static GreeterStub newStub(Channel channel) {
      io.grpc.stub.AbstractStub.StubFactory<GreeterStub> factory =
        new io.grpc.stub.AbstractStub.StubFactory<GreeterStub>() {
          @Override
          public GreeterStub newStub(Channel channel, io.grpc.CallOptions callOptions) {
            return new GreeterStub(channel, callOptions);
          }
        };
      return GreeterStub.newStub(factory, channel);
    }

    /**
     * Creates a new blocking-style stub that supports all types of calls on the service
     */
    public static GreeterBlockingV2Stub newBlockingV2Stub(
        Channel channel) {
      io.grpc.stub.AbstractStub.StubFactory<GreeterBlockingV2Stub> factory =
        new io.grpc.stub.AbstractStub.StubFactory<GreeterBlockingV2Stub>() {
          @Override
          public GreeterBlockingV2Stub newStub(Channel channel, io.grpc.CallOptions callOptions) {
            return new GreeterBlockingV2Stub(channel, callOptions);
          }
        };
      return GreeterBlockingV2Stub.newStub(factory, channel);
    }

    /**
     * Creates a new blocking-style stub that supports unary and streaming output calls on the service
     */
    public static GreeterBlockingStub newBlockingStub(
        Channel channel) {
      io.grpc.stub.AbstractStub.StubFactory<GreeterBlockingStub> factory =
        new io.grpc.stub.AbstractStub.StubFactory<GreeterBlockingStub>() {
          @Override
          public GreeterBlockingStub newStub(Channel channel, io.grpc.CallOptions callOptions) {
            return new GreeterBlockingStub(channel, callOptions);
          }
        };
      return GreeterBlockingStub.newStub(factory, channel);
    }

    /**
     * Creates a new ListenableFuture-style stub that supports unary calls on the service
     */
    public static GreeterFutureStub newFutureStub(
        Channel channel) {
      io.grpc.stub.AbstractStub.StubFactory<GreeterFutureStub> factory =
        new io.grpc.stub.AbstractStub.StubFactory<GreeterFutureStub>() {
          @Override
          public GreeterFutureStub newStub(Channel channel, io.grpc.CallOptions callOptions) {
            return new GreeterFutureStub(channel, callOptions);
          }
        };
      return GreeterFutureStub.newStub(factory, channel);
    }

    /**
     * <pre>
     * The greeting service definition.
     * </pre>
     */
    public interface AsyncService {

      /**
       * <pre>
       * Sends a greeting
       * </pre>
       */
      default void sayHello(io.grpc.examples.helloworld.HelloRequest request,
          io.grpc.stub.StreamObserver<io.grpc.examples.helloworld.HelloReply> responseObserver) {
        io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getSayHelloMethod(), responseObserver);
      }
    }

    /**
     * Base class for the server implementation of the service Greeter.
     * <pre>
     * The greeting service definition.
     * </pre>
     */
    public static abstract class GreeterImplBase
        implements io.grpc.BindableService, AsyncService {

      @Override public final io.grpc.ServerServiceDefinition bindService() {
        return GreeterGrpc.bindService(this);
      }
    }

    /**
     * A stub to allow clients to do asynchronous rpc calls to service Greeter.
     * <pre>
     * The greeting service definition.
     * </pre>
     */
    public static final class GreeterStub
        extends io.grpc.stub.AbstractAsyncStub<GreeterStub> {
      private GreeterStub(
          Channel channel, io.grpc.CallOptions callOptions) {
        super(channel, callOptions);
      }

      @Override
      protected GreeterStub build(
          Channel channel, io.grpc.CallOptions callOptions) {
        return new GreeterStub(channel, callOptions);
      }

      /**
       * <pre>
       * Sends a greeting
       * </pre>
       */
      public void sayHello(io.grpc.examples.helloworld.HelloRequest request,
          io.grpc.stub.StreamObserver<io.grpc.examples.helloworld.HelloReply> responseObserver) {
        io.grpc.stub.ClientCalls.asyncUnaryCall(
            getChannel().newCall(getSayHelloMethod(), getCallOptions()), request, responseObserver);
      }
    }

    /**
     * A stub to allow clients to do synchronous rpc calls to service Greeter.
     * <pre>
     * The greeting service definition.
     * </pre>
     */
    public static final class GreeterBlockingV2Stub
        extends io.grpc.stub.AbstractBlockingStub<GreeterBlockingV2Stub> {
      private GreeterBlockingV2Stub(
          Channel channel, io.grpc.CallOptions callOptions) {
        super(channel, callOptions);
      }

      @Override
      protected GreeterBlockingV2Stub build(
          Channel channel, io.grpc.CallOptions callOptions) {
        return new GreeterBlockingV2Stub(channel, callOptions);
      }

      /**
       * <pre>
       * Sends a greeting
       * </pre>
       */
      public io.grpc.examples.helloworld.HelloReply sayHello(io.grpc.examples.helloworld.HelloRequest request) {
        return io.grpc.stub.ClientCalls.blockingUnaryCall(
            getChannel(), getSayHelloMethod(), getCallOptions(), request);
      }
    }

    /**
     * A stub to allow clients to do limited synchronous rpc calls to service Greeter.
     * <pre>
     * The greeting service definition.
     * </pre>
     */
    public static final class GreeterBlockingStub
        extends io.grpc.stub.AbstractBlockingStub<GreeterBlockingStub> {
      private GreeterBlockingStub(
          Channel channel, io.grpc.CallOptions callOptions) {
        super(channel, callOptions);
      }

      @Override
      protected GreeterBlockingStub build(
          Channel channel, io.grpc.CallOptions callOptions) {
        return new GreeterBlockingStub(channel, callOptions);
      }

      /**
       * <pre>
       * Sends a greeting
       * </pre>
       */
      public io.grpc.examples.helloworld.HelloReply sayHello(io.grpc.examples.helloworld.HelloRequest request) {
        return io.grpc.stub.ClientCalls.blockingUnaryCall(
            getChannel(), getSayHelloMethod(), getCallOptions(), request);
      }
    }

    /**
     * A stub to allow clients to do ListenableFuture-style rpc calls to service Greeter.
     * <pre>
     * The greeting service definition.
     * </pre>
     */
    public static final class GreeterFutureStub
        extends io.grpc.stub.AbstractFutureStub<GreeterFutureStub> {
      private GreeterFutureStub(
          Channel channel, io.grpc.CallOptions callOptions) {
        super(channel, callOptions);
      }

      @Override
      protected GreeterFutureStub build(
          Channel channel, io.grpc.CallOptions callOptions) {
        return new GreeterFutureStub(channel, callOptions);
      }

      /**
       * <pre>
       * Sends a greeting
       * </pre>
       */
      public com.google.common.util.concurrent.ListenableFuture<io.grpc.examples.helloworld.HelloReply> sayHello(
          io.grpc.examples.helloworld.HelloRequest request) {
        return io.grpc.stub.ClientCalls.futureUnaryCall(
            getChannel().newCall(getSayHelloMethod(), getCallOptions()), request);
      }
    }

    private static final int METHODID_SAY_HELLO = 0;

    private static final class MethodHandlers<Req, Resp> implements
        io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
        io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
        io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
        io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
      private final AsyncService serviceImpl;
      private final int methodId;

      MethodHandlers(AsyncService serviceImpl, int methodId) {
        this.serviceImpl = serviceImpl;
        this.methodId = methodId;
      }

      @Override
      @SuppressWarnings("unchecked")
      public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
        switch (methodId) {
          case METHODID_SAY_HELLO:
            serviceImpl.sayHello((io.grpc.examples.helloworld.HelloRequest) request,
                (io.grpc.stub.StreamObserver<io.grpc.examples.helloworld.HelloReply>) responseObserver);
            break;
          default:
            throw new AssertionError();
        }
      }

      @Override
      @SuppressWarnings("unchecked")
      public io.grpc.stub.StreamObserver<Req> invoke(
          io.grpc.stub.StreamObserver<Resp> responseObserver) {
        switch (methodId) {
          default:
            throw new AssertionError();
        }
      }
    }

    public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getSayHelloMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                io.grpc.examples.helloworld.HelloRequest,
                io.grpc.examples.helloworld.HelloReply>(
                  service, METHODID_SAY_HELLO)))
          .build();
    }

    private static abstract class GreeterBaseDescriptorSupplier
        implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
      GreeterBaseDescriptorSupplier() {}

      @Override
      public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
        return io.grpc.examples.helloworld.HelloWorldProto.getDescriptor();
      }

      @Override
      public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
        return getFileDescriptor().findServiceByName("Greeter");
      }
    }

    private static final class GreeterFileDescriptorSupplier
        extends GreeterBaseDescriptorSupplier {
      GreeterFileDescriptorSupplier() {}
    }

    private static final class GreeterMethodDescriptorSupplier
        extends GreeterBaseDescriptorSupplier
        implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
      private final String methodName;

      GreeterMethodDescriptorSupplier(String methodName) {
        this.methodName = methodName;
      }

      @Override
      public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
        return getServiceDescriptor().findMethodByName(methodName);
      }
    }

    private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

    public static io.grpc.ServiceDescriptor getServiceDescriptor() {
      io.grpc.ServiceDescriptor result = serviceDescriptor;
      if (result == null) {
        synchronized (GreeterGrpc.class) {
          result = serviceDescriptor;
          if (result == null) {
            serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
                .setSchemaDescriptor(new GreeterFileDescriptorSupplier())
                .addMethod(getSayHelloMethod())
                .build();
          }
        }
      }
      return result;
    }
  }
}
