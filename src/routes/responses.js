class HttpDefaultResponse {
  statusCode;
  body;
  type;

  constructor(statusCode, body, type) {
    this.body = body;
    this.statusCode = statusCode;
    this.type = type;
  }

  handle() {
    return {
      status_code: this.statusCode,
      body: this.body,
      type: this.type,
    };
  }
}

class Success extends HttpDefaultResponse {
  constructor(body) {
    super(200, body, "ok");
  }
}

class Created extends HttpDefaultResponse {
  constructor(body) {
    super(201, body, "created");
  }
}

class NoContent extends HttpDefaultResponse {
  constructor() {
    super(204, undefined, "no_content");
  }
}

class BadRequestException extends HttpDefaultResponse {
  constructor(body) {
    super(400, body, "bad_request");
  }
}

class UnauthorizedException extends HttpDefaultResponse {
  constructor(body) {
    super(401, body, "unauthorized");
  }
}

class ForbiddenException extends HttpDefaultResponse {
  constructor(body) {
    super(403, body, "forbidden");
  }
}

class ConflictException extends HttpDefaultResponse {
  constructor(body) {
    super(409, body, "conflict");
  }
}

class NotFoundException extends HttpDefaultResponse {
  constructor(body) {
    super(404, body, "not_found");
  }
}

class ServerErrorException extends HttpDefaultResponse {
  constructor(body) {
    super(500, body, "server_error");
  }
}

module.exports = {
  Success,
  Created,
  NoContent,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  ServerErrorException,
  ForbiddenException,
};
